import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api: Window['api'] = {
  dialogSelectPath() {
    return ipcRenderer.invoke('dialog-select-path')
  },
  appGetPath(name) {
    return ipcRenderer.invoke('app-get-path', name)
  },
  ffprobeGetVideoInfo(path) {
    return ipcRenderer.invoke('ffprobe-get-video-info', path)
  },
  storeGet(key: string) {
    return ipcRenderer.invoke('store-get', key)
  },
  storeSet(key: string, value: any) {
    return ipcRenderer.invoke('store-set', key, value)
  },
  aria2State(state) {
    return ipcRenderer.invoke('aria2-state', state)
  },
  aria2Client() {
    return ipcRenderer.invoke('aria2-client')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
