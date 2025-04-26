import { ElectronAPI } from '@electron-toolkit/preload'
import { app } from 'electron'
import type { Key } from '../main/ipcMain/store'

interface Api {
  dialogSelectPath(): Promise<Electron.OpenDialogReturnValue>
  appGetPath(name?: Parameters<typeof app.getPath>[0]): Promise<string>
  ffprobeGetVideoInfo(path?: string): null | Promise<any>
  storeGet(key: Key): Promise<any>
  storeSet(key: Key, value: any): Promise<any>
}


declare global {

  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
