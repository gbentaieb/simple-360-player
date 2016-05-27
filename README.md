simple-360-player
===============

The simple-360-player is a Javascript library that aims to provide a tool to easily create and integrate 360 video player in your web pages.

## Installation

The fastest way to use our player is to add this repository as a dependency of
your `package.json` dependency field:

```
npm install --save git+ssh://git@github.com/gbentaieb/simple-360-player.git
```

You can then either use directly the `dist/simple-360-player.js` file:

```html
<script src="node_modules/simple-360-player/dist/simple-360-player.js"></script>
```

Or with tools like [Browserify](http://browserify.org/) or
[Webpack](http://webpack.github.io/) you can import the player as a CommonJS
or AMD dependency.

## API

Import the Simple360Player class:

```sh
import Simple360Player from 'simple-360-player'; // ES6
```

If you are using the dist directly, you can access this class like this:

```sh
var Simple360Player = Simple360Player.default;
```

Create and initiate a player instance:

```sh
window.player = new Simple360Player(container); // container is an HTML container for the 360 player
window.player.init();
```

Then, you can use the video element to, for instance, setup the source, and launch the 360 rendering process:

```sh
window.player.videoElement.src = "url-of-your-file-here"; // cross domain will not work!
window.player.start();
```

video is controlled through player.videoElement element.

To properly clear the player, call:

```sh
window.player.destroy();
```

## Demo

To launch the demo yourself, run `make demo` and start a local webserver from the root directory of the repository. For instance:

```sh
python -m SimpleHTTPServer 8080 # open http://localhost:8080/demo
```

N.B: do not forget to add a video file called test.mp4 in the demo repository. This will be the file played by our player.

## Dependencies

- [RxJS](https://github.com/Reactive-Extensions/RxJS)
- [React](https://github.com/facebook/react)

## Build

A build is directly included at `dist/simple-360-player.js` directory if you don't
want to build it yourself.

To bundle the application yourself, we use `make`. The important task to know:

```sh
make clean
# build dist/simple-360-player.js
make build
# build dist/simple-360-player.min.js
make min
# build and watch file change for rebuild
make dev
# lint the code
make lint
```

## Target support

For now, this works with Chrome (desktop + mobile), Firefox, and Edge

## Other Infos

If you want to play 360 Dash or HLS videos, you can by using this package and one of those two awesome projects:

- [hls.js](https://github.com/dailymotion/hls.js)
- [dash.js](https://github.com/Dash-Industry-Forum/dash.js)
