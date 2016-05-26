import React from 'react';
import ReactDOM from 'react-dom';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/skip';

import MobileDetect from 'mobile-detect';

import Video360 from './video360';
import Helper360 from './helper360';

export default class Simple360Player {

  constructor(container) {
    this.container = container;
    this.md = new MobileDetect(window.navigator.userAgent);
    this.isMobile = (!!this.md.phone() || !!this.md.tablet());
  }

  addMouseObservable() {
    this.downEvents$ = Observable.fromEvent(this.canvasElement, 'mousedown');
    this.upEvents$ = Observable.fromEvent(document, 'mouseup');
    this.moveEvents$ = Observable.fromEvent(document, 'mousemove');

    this.mouseObservable$ = this.downEvents$
      .switchMap(downEvent => {
        this.mouse = { x: downEvent.clientX, y: downEvent.clientY };

        return this.moveEvents$
          .startWith(downEvent)
          .takeUntil(this.upEvents$);
      });

    this.mouseObserver = this.mouseObservable$.subscribe(moveEvent => {
      // disable vertical scroll on mobile devices
      const deltaX = moveEvent.clientX - this.mouse.x;
      const deltaY = !this.isMobile ? moveEvent.clientY - this.mouse.y : 0;

      this.mouse = { x: moveEvent.clientX, y: moveEvent.clientY };

      this.helper360.rotateScene(-deltaX / 300, -deltaY / 300);
    });

    this.upObserver = this.upEvents$.subscribe(() => {
      this.mouse = null;
    });
  }

  addDeviceObservable() {
    if (window.DeviceMotionEvent && this.isMobile) {
      this.device = { orientation: screen.orientation.angle };

      this.deviceMotionEvent$ = Observable.fromEvent(window, 'deviceorientation');
      this.deviceChangeEvent$ = Observable.fromEvent(window, 'orientationchange');

      this.deviceMotionObserver = this.deviceMotionEvent$.subscribe(motion => {
        this.helper360.updateOrientationScene(this.device.orientation, motion);
      });

      this.deviceChangeObserver = this.deviceChangeEvent$.subscribe(() => {
        this.device.orientation = screen.orientation.angle;
      });
    }
  }

  init() {
    const { offsetWidth: width, offsetHeight: height } = this.container;
    const options = { width, height, ratio: 16 / 9 };

    this.component = ReactDOM.render(<Video360 />, this.container);

    this.videoElement = this.component.refs.videoTag;
    this.canvasElement = this.component.refs.canvasTag;
    this.helper360 = new Helper360(this.canvasElement, this.videoElement, options);
  }

  start() {
    this.helper360.createScene();
    this.helper360.renderLoop();

    this.addMouseObservable();
    this.addDeviceObservable();
  }

  updateSize(width, height) {
    this.helper360.updateSceneSize(width, height);
  }

  destroy() {
    if (this.mouseObserver) {
      this.mouseObserver.unsubscribe();
    }
    if (this.upObserver) {
      this.upObserver.unsubscribe();
    }
    if (this.deviceMotionObserver) {
      this.deviceMotionObserver.unsubscribe();
    }
    if (this.deviceChangeObserver) {
      this.deviceChangeObserver.unsubscribe();
    }

    this.helper360.stopRenderLoop();
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
