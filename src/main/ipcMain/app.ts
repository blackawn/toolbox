import { app, ipcMain } from 'electron'

export function appModule() {
  ipcMain.handle('app-get-path', (_, name?: Parameters<typeof app.getPath>[0]) => {
    if (!name) return null
    return app.getPath(name)
  })
}
