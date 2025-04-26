import { app } from 'electron'
import Store from 'electron-store'

const defaultConfig = {
  downloadPath: app.getPath('downloads')
}

export const store = new Store({
  cwd: app.getPath('userData'),
  defaults: defaultConfig
})
