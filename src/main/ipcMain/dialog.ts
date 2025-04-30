import { app, dialog, ipcMain } from 'electron'
import { store } from '../store'

export function dialogModule() {

  ipcMain.handle('dialog-select-path', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: '选择下载目录',
      defaultPath: app.getPath('downloads')
    })

    if (!result.canceled) {
      store.set('aria2.dir', result.filePaths[0])
    }

    return result
  })
}
