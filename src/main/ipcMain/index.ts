import { appModule } from './app'
import { dialogModule } from './dialog'
import { handleFfmpeg } from './ffmpeg'
import { storeModule } from './store'
import { aria2Module } from './aria2'

export function ipcMainHandle() {
  storeModule()
  appModule()
  aria2Module()
  dialogModule()
  handleFfmpeg()
}
