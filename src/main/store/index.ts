import { app } from 'electron'
import { isDev } from 'electron-util/main'
import Store from 'electron-store'
import path from 'path'
import { createChildProcess } from '@naria2/node'

type Aria2Conf = Parameters<typeof createChildProcess>[0]

export interface StoreConfig {
  aria2: any
}

const defaultConfig: StoreConfig = {
  aria2: {
    dir: app.getPath('downloads'),
    rpc: {
      listenPort: 6800
    },
    'save-session': isDev
      ? path.join(app.getAppPath(), '/resources/arai2-session.txt')
      : path.join(process.resourcesPath, 'arai2-session.txt'),
    'input-file': isDev
      ? path.join(app.getAppPath(), '/resources/arai2-session.txt')
      : path.join(process.resourcesPath, 'arai2-session.txt')
  }
}

// console.log(path.join(app.getAppPath(), '/resources/arai2-session.txt'))
// console.log(path.join(process.resourcesPath, 'arai2-session.txt'))

export const store = new Store({
  cwd: isDev ? app.getAppPath() : process.resourcesPath,
  defaults: defaultConfig
})
