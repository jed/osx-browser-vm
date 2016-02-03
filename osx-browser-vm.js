import {exec} from 'child_process'
import {readFileSync} from 'fs'
import {join} from 'path'

export const safari = {run: runInBrowser, name: "Safari"}
export const chrome = {run: runInBrowser, name: "Google Chrome"}
export const canary = {run: runInBrowser, name: "Google Chrome Canary"}
export const firefox = {} // https://git.io/vgmfT

const osascriptPath = join(__dirname, 'osascript.js')
const osascript = readFileSync(osascriptPath, "utf8")

function runInBrowser(code, cb) {
  if (typeof code == 'function') code = `(${code}())`

  code = code.replace(/'/g, "'\\''")

  var command = `osascript -l JavaScript - '${this.name}' '${code}'`
  var options = {encoding: 'utf8'}

  exec(command, options, onexec).stdin.end(osascript)

  function onexec(err, stdout, stderr) {
    if (err) cb(err)

    try { cb(null, JSON.parse(stdout)) }
    catch (err) { cb(err) }
  }
}
