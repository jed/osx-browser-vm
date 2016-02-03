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
      throw new Error(this.name + " not supported.")
  }

  tab.close()
  return JSON.stringify(output)
}