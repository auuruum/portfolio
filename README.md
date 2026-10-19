# auuruum portfolio

Static portfolio for Aurimas / auuruum.

Open `index.html` directly in a browser. No build step needed.

For seamless navigation, serve the repository over HTTP (for example, `python3 -m http.server 8767`) and open `http://localhost:8767/`. Direct file links retain ordinary navigation.

Home and Work with me share one persistent video in `assets/cosmic-scene.js`. `assets/page-transitions.js` loads the destination foreground, styles and page initializer while keeping that video connected and playing. Page initializers register cleanup handlers for listeners, observers and timers. History, project anchors and the inquiry draft are preserved; failed requests fall back to ordinary page navigation.
