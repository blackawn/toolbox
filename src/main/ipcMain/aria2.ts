import { createClient } from 'naria2'
import type { Aria2Client } from 'naria2'
import { createChildProcess, getNaria2Binary } from '@naria2/node'
import { aria2, system } from 'maria2'
import { ipcMain } from 'electron'
import { isDev } from 'electron-util/main'
import { store } from '../store'

let client: Aria2Client | null = null

async function startAria2() {
  const conf = store.get('aria2')
  console.log(conf);

  client = await createClient(
    createChildProcess({
      ...conf,
      spawn: {
        binary: isDev
          ? getNaria2Binary()
          : getNaria2Binary().replace('app.asar', 'app.asar.unpacked')
      }
    })
  )
}

function getClientConn() {
  if (client) return true

  return false
}

function errorReturn(channel: string, message: any) {
  return {
    channel,
    type: 'error',
    message
  }
}

export function aria2Module() {
  startAria2()

  ipcMain.handle('aria2-state', async (_, state) => {
    if (state) {
      await startAria2()
    } else {
      if (client) {
        await client.shutdown()
        client = null
      }
    }

    return getClientConn()
  })

  ipcMain.handle('aria2-client', (_) => {
    return getClientConn()
  })

  ipcMain.on('aria2-get-version', async (event) => {
    try {
      const conn = client?.conn as any
      const result = await aria2.getVersion(conn)

      // aria2
      //   .addUri(conn, [
      //     'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/stream-117072359751942931-1744514839.ts',
      //     'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/stream-117072359751942931-1744514846.ts',
      //     'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/stream-117072359751942931-1744514850.ts'
      //   ])
      //   .catch((e) => {
      //     console.log(e)
      //   })
      //   .then((d) => {
      //     console.log(d)
      //   })

      event.reply('aria2-get-version-reply', result)
    } catch (e: any) {
      event.reply('error', errorReturn('aria2-get-version', e.message))
    }
  })
}
