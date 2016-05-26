simple-360-player
===============

The one-player-core is a Javascript library that aims to provide a tool to easily create and integrate 360 video player in your web pages.

## Installation

The fastest way to use our player is to add this repository as a dependency of
your `package.json` dependency field:

```
npm install --save https://github.com/gbentaieb/simple-360-player/
```

You can then either use directly the `dist/simple-360-player.js` file:

```html
<script src="node_modules/one-player-core/dist/simple-360-player.js"></script>
```

Or with tools like [Browserify](http://browserify.org/) or
[Webpack](http://webpack.github.io/) you can import the player as a CommonJS
or AMD dependency.

## API

First, create and initiate a player instance:

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

For now, this works with Chrome (desktop + mobile) and Firefox
