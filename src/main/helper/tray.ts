import { Menu, Tray } from 'electron'
import type { MenuItem, MenuItemConstructorOptions } from 'electron'
import icon from '../../../resources/icon.png?asset'

interface UseTrayOptions {
  buildFromTemplate?: Array<MenuItemConstructorOptions | MenuItem>
}

export const createTray = (options?: UseTrayOptions) => {
  const tray = new Tray(icon)

  if (options?.buildFromTemplate) {
    tray.setContextMenu(Menu.buildFromTemplate(options?.buildFromTemplate))
  }

  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')

  return tray
}
