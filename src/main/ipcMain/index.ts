import { appModule } from './app'
import { dialogModule } from './dialog'
import { handleFfmpeg } from './ffmpeg'
import { storeModule } from './store'

export function ipcMainHandle() {
  storeModule()
  appModule()
  dialogModule()
  handleFfmpeg()
}
