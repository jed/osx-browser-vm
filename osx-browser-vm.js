import {exec} from 'child_process'

export const safari = {run: runInBrowser, name: "Safari"}
export const chrome = {run: runInBrowser, name: "Google Chrome"}
export const canary = {run: runInBrowser, name: "Google Chrome Canary"}
export const firefox = {} // https://bugzilla.mozilla.org/show_bug.cgi?id=5704

function runInBrowser(code, cb) {
  if (typeof code == 'function') code = `(${code}())`

  code = code.replace(/'/g, "'\\''")

  var command = `osascript -l JavaScript - '${this.name}' '${code}'`
  var options = {encoding: 'utf8'}
  var file = run.toString()

  exec(command, options, onexec).stdin.end(file)

  function onexec(err, stdout, stderr) {
    if (err) cb(err)

    try { cb(null, JSON.parse(stdout)) }
    catch (err) { cb(err) }
  }
}

function run(args) {
  var appName = args[0]
  var javascript = args[1]
  var browser = Application(appName)
  var window = browser.windows[0]
  var tab = browser.Tab()
  var output

  window.tabs.push(tab)

  switch (appName) {
    case 'Safari':
      output = browser.doJavaScript(javascript, {in: tab})
      break

    case 'Google Chrome':
    case 'Google Chrome Canary':
      output = tab.execute({javascript})
      break

    default:
      throw new Error(`${this.name} not supported.`)
  }

  tab.close()
  return JSON.stringify(output)
}
