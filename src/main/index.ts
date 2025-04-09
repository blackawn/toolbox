import { app, shell, BrowserWindow, ipcMain, WebContentsView } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { useTray } from './helper/tray'

let mainWindow: BrowserWindow | null = null
let wcw: WebContentsView | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 760,
    minWidth: 900,
    minHeight: 760,
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webviewTag: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow?.hide()
  })

  // 监听窗口尺寸变化后
  mainWindow.on('resized', () => {
    mainWindow?.webContents.send('window-resized')
  })

  // 监听窗口最小尺寸变化
  mainWindow.on('minimize', () => {
    mainWindow?.webContents.send('window-resized')
  })

  // 监听窗口最大尺寸变化
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window-resized')
  })

  // 监听窗口最大尺寸还原变化
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // 创建托盘
  const tray = useTray({
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

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.on('window-minimize', () => {
    mainWindow?.minimize()
  })

  ipcMain.on('window-maximize', () => {
    mainWindow?.isMaximized() ? mainWindow?.restore() : mainWindow?.maximize()
  })

  ipcMain.on('window-close', () => {
    mainWindow?.hide()
  })

  // 监听创建WebContentsView
  ipcMain.on('create-web-contents-view', (_, options) => {
    if (mainWindow) {
      if (wcw) {
        mainWindow.contentView.removeChildView(wcw)
        wcw = null
      }

      // 创建新的WebContentsView
      wcw = new WebContentsView({
        webPreferences: {
          webviewTag: true,
        }
      })

      mainWindow.contentView.addChildView(wcw)

      // 设置位置和大小
      wcw.setBounds({
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height
      })

      wcw.setBorderRadius(10)

      wcw.setBackgroundColor('#00000000')

      wcw.webContents.loadURL(options.url)
      //wcw.webContents.openDevTools()

      // 在webContents中打开新的页面窗口时
      wcw.webContents.setWindowOpenHandler(({ url }) => {
        wcw?.webContents.loadURL(url)
        return { action: 'deny' }
      })

      // 监听所有资源请求
      wcw.webContents.session.webRequest.onCompleted((details) => {
        if (details.url.includes('m3u8')) {
          console.log(details)
        }
      })

    }
  })

  // 监听更新WebContentsView的位置和大小
  ipcMain.on('update-web-contents-view', (_, options) => {
    if (wcw) {
      wcw.setBounds({
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height
      })
    }
  })

  ipcMain.on('destroy-web-contents-view', () => {
    if (mainWindow && wcw) {
      mainWindow.contentView.removeChildView(wcw)
      wcw = null
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
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
