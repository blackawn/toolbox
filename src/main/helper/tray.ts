import { Menu, type MenuItem, type MenuItemConstructorOptions, nativeImage, Tray } from 'electron'

interface UseTrayOptions {
  buildFromTemplate?: Array<MenuItemConstructorOptions | MenuItem>
}

export const useTray = (options?: UseTrayOptions) => {
  const icon = nativeImage.createFromPath(`resources/icon.png`)
  const tray = new Tray(icon)

  if (options?.buildFromTemplate) {
    tray.setContextMenu(Menu.buildFromTemplate(options?.buildFromTemplate))
  }

  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')

  return tray
}
