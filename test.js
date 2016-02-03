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
