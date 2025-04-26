import { app, dialog, ipcMain } from 'electron'
import { store } from '../store'

export function dialogModule() {
  // 处理选择下载路径
  ipcMain.handle('dialog-select-path', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: '选择下载目录',
      defaultPath: app.getPath('downloads')
    })

    if (!result.canceled) {
      store.set('downloadPath', result.filePaths[0])
    }

    return result
  })
}
