import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createTray } from './helper/tray'
import { ipcMainHandle } from './ipcMain'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 760,
    minWidth: 900,
    minHeight: 760,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow?.hide()
  })

  mainWindow.on('resized', () => {
    mainWindow?.webContents.send('window-resized')
  })

  mainWindow.on('minimize', () => {
    mainWindow?.webContents.send('window-resized')
  })

  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-resized')
  })

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window-resized')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function ipcMainOn() {
  ipcMain.on('window-minimize', () => {
    mainWindow?.minimize()
  })

  ipcMain.on('window-maximize', () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow?.maximize()
    }
  })

  ipcMain.on('window-close', () => {
    mainWindow?.hide()
  })

  ipcMain.on('close-all-child-window', () => {
    mainWindow?.getChildWindows().forEach((win) => {
      win.destroy()
    })
  })

  ipcMain.on('open-url', (_, options) => {
    if (!mainWindow) return

    // Create new BrowserWindow
    const childWindow = new BrowserWindow({
      width: 700,
      height: 600,
      autoHideMenuBar: true,
      parent: mainWindow
    })

    // Loading URL
    childWindow.loadURL(options.url)

    // Complete request
    childWindow.webContents.session.webRequest.onCompleted((details) => {
      if (details.url.includes('m3u8')) {
        const { url, id, method, resourceType, timestamp, statusCode } = details
        mainWindow?.webContents.send('get-video-request-details', {
          url,
          id,
          method,
          resourceType,
          timestamp,
          statusCode
        })
      }
    })
  })
}

function initTray() {
  const tray = createTray({
    buildFromTemplate: [
      {
        label: '退出',
        type: 'normal',
        click() {
          tray.destroy()
          BrowserWindow.getAllWindows().forEach((win) => win.destroy())
        }
      }
    ]
  })

  tray.on('click', () => {
    mainWindow?.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  initTray()

  ipcMainHandle()

  ipcMainOn()

  createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
