import { ipcMain } from 'electron'
import { store } from '../store'

export type Key = 'downloadPath'

export function storeModule() {
  ipcMain.handle('store-get', (_, key: Key) => {
    return store.get(key)
  })

  ipcMain.handle('store-set', (_, key: Key, value: any) => {
    return store.set(key, value)
  })
}
