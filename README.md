os-browser-vm
=============

This library lets you evaluate arbitary JavaScript on the browsers installed on your local OS X machine. It currently supports [Safari](http://www.apple.com/safari/), [Google Chrome](https://www.google.com/chrome/browser/desktop/), and [Google Chrome Canary](https://www.google.com/chrome/browser/canary.html) (Firefox support is [apparently not possible](https://bugzilla.mozilla.org/show_bug.cgi?id=5704)). It works thanks to support for [JavaScript automation](http://tylergaw.com/articles/building-osx-apps-with-js) in modern releases of OS X, and is similar to the [Node.js vm module](https://nodejs.org/api/vm.html).

Example
-------

```javascript
import {safari, chrome, canary} from '.'

safari.run(test, log.bind(null, "Safari"))
chrome.run(test, log.bind(null, "Chrome"))
canary.run(test, log.bind(null, "Canary"))

function test() {
  return Object.getOwnPropertyNames(window).length
}

function log(browser, err, data) {
  console.log("%s has %s window properties.", browser, data)
}
```

Results
-------

![image](https://cloud.githubusercontent.com/assets/4433/12774189/76a93b1a-ca10-11e5-8bd0-f3522d955a94.png)
