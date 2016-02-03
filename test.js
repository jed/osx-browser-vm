import {safari, chrome, canary} from './osx-browser-vm.js'

var vms = [safari, chrome, canary]
var code = 'Object.getOwnPropertyNames(window).length'

console.log("Number of properties on window:")

vms.forEach(vm => {
  vm.run(code, (err, count) => {
    console.log("- %s: %s", vm.name, count)
  })
})
