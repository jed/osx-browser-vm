os-browser-vm
=============

```javascript
import {safari, chrome, canary} from '.'

safari.run(test, log.bind(null, "Safari"))
chrome.run(test, log.bind(null, "Chrome"))
canary.run(test, log.bind(null, "Canary"))

// Canary has 694 window properties.
// Chrome has 682 window properties.
// Safari has 607 window properties.

function test() {
  return Object.getOwnPropertyNames(window).length
}

function log(browser, err, data) {
  console.log("%s has %s window properties.", browser, data)
}
```