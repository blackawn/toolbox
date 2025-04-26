import { ipcMain } from 'electron'
import ffmpeg from 'fluent-ffmpeg'
import ffmpegBinary from '@ffmpeg-installer/ffmpeg'
import ffprobeBinary from '@ffprobe-installer/ffprobe'


export function handleFfmpeg() {
  if (ffmpegBinary && ffprobeBinary) {
    ffmpeg.setFfmpegPath(ffmpegBinary.path)
    ffmpeg.setFfprobePath(ffprobeBinary.path)
  } else {
    console.error('ffmpeg or ffprobe path not found')
  }

  ipcMain.handle('ffprobe-get-video-info', (_, url: string) => {
    if (!url) return null
    return new Promise((resolve, reject) => {
      ffmpeg(url).ffprobe((err, metadata) => {
        if (err) {
          reject(err)
        } else {
          const data = {
            duration: metadata.format.duration,
            format: metadata.format.format_name,
            resolution: metadata.streams[0].width + 'x' + metadata.streams[0].height
          }
          resolve(data)
        }
      })
    })
  })

  ipcMain.on('ffmpeg-download-url', (event, url: string, format = 'mp4') => {
    if (!url) {
      event.sender.send('ffmpeg-download-url-reply', url)
      console.log(format);

      return
    }

    // const downloadPath = store.get('downloadPath')
    // const filename = `${Date.now()}.${format}`

    // const f = ffmpeg(url)
    //   .outputOptions(['-c copy'])
    //   .output(`${downloadPath}/${filename}`)
    //   .on('start', (commandLine) => {
    //     console.log('FFmpeg command', commandLine)
    //   })
  })
}
