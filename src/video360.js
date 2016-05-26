import React, { Component } from 'react';

const canvasStyle = { top: 0, left: 0, position: 'relative' };
const videoStyle = { display: 'none' };

export default class Video360 extends Component {

  render() {
    return (
      <div>
        <canvas style={ canvasStyle } ref="canvasTag"></canvas>
        <video style={ videoStyle } ref="videoTag"></video>
      </div>
    );
  }

}
