# find-browser-path

A Node.js package to dynamically find the installation paths of Google Chrome or Chromium on macOS, Linux, and Windows.

## Installation

```bash
npm install locate-chrome-chromium
```

## Usage

```javascript
const findBrowserPath = require('locate-chrome-chromium');

// To find Google Chrome
console.log(findBrowserPath('chrome'));

// To find Chromium
console.log(findBrowserPath('chromium'));
```