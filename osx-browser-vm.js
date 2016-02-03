import {exec} from 'child_process'

export const safari = {run: runInBrowser.bind(null, "Safari")}
export const chrome = {run: runInBrowser.bind(null, "Google Chrome")}
export const canary = {run: runInBrowser.bind(null, "Google Chrome Canary")}
export const firefox = {} // https://bugzilla.mozilla.org/show_bug.cgi?id=5704

export default function runInBrowser(appName, code, cb) {
  if (typeof code == 'function') code = `(${code}())`

  code = code.replace(/'/g, "'\\''")

  var command = `osascript -l JavaScript - '${appName}' '${code}'`
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
      throw new Error(`${appName} not supported.`)
  }

  tab.close()
  return JSON.stringify(output)
}
