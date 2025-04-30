import { ElectronAPI } from '@electron-toolkit/preload'
import { app } from 'electron'
import type { Key } from '../main/ipcMain/store'
import type {
  naria2CreateProcessArgs,
  Naria2ProcessReturn,
  Naria2DownloadUrlArgs,
  Naria2DownloadUrlReturn
} from '../main/ipcMain/aria2'
import type { Aria2Client } from 'naria2'

interface Api {
  dialogSelectPath(): Promise<Electron.OpenDialogReturnValue>
  appGetPath(name?: Parameters<typeof app.getPath>[0]): Promise<string>
  ffprobeGetVideoInfo(path?: string): null | Promise<any>
  storeGet(key: string): Promise<any>
  storeGet(key: Key): Promise<any>
  storeSet(key: string, value: any): Promise<any>
  storeSet(key: Key, value: any): Promise<any>
  aria2State(state: boolean): Promise<boolean>
  aria2Client(): Promise<boolean>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
