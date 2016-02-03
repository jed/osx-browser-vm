os-browser-vm
=============

This library lets you evaluate arbitary JavaScript on the browsers installed on your local OS X machine, through Node.js. It currently supports [Safari](http://www.apple.com/safari/), [Google Chrome](https://www.google.com/chrome/browser/desktop/), and [Google Chrome Canary](https://www.google.com/chrome/browser/canary.html) (Firefox support is [apparently not possible](https://bugzilla.mozilla.org/show_bug.cgi?id=5704)). It works thanks to support for [JavaScript automation](http://tylergaw.com/articles/building-osx-apps-with-js) in modern releases of OS X, and is similar to the [Node.js vm module](https://nodejs.org/api/vm.html).

API
---

This library exports three properties: `safari`, `chrome`, and `canary`.

### {safari|chrome|canary}.run(code, callback)

`code` is the JavaScript string to be evaluated. The result of the last expression in this string is passed to the `callback` in the usual Node.js `(err, data)` signature.

A function can also be passed for `code`, in which case it is stringified as an IIFE.

Example
-------

```javascript
import {safari, chrome, canary} from 'osx-browser-vm'

var vms = [safari, chrome, canary]
var code = 'Object.getOwnPropertyNames(window).length'

console.log("Number of properties on window:")

vms.forEach(vm => {
  vm.run(code, (err, count) => {
    console.log("- %s: %s", vm.name, count)
  })
})

// Number of properties on window:
// - Google Chrome Canary: 694
// - Google Chrome: 682
// - Safari: 607
```
