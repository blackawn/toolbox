import ffmpeg from 'fluent-ffmpeg'
import ffmpegBinary from '@ffmpeg-installer/ffmpeg'
import ffprobeBinary from '@ffprobe-installer/ffprobe'

function getVideoDuration(inputUrl: string) {
  if (ffmpegBinary && ffprobeBinary) {
    ffmpeg.setFfmpegPath(ffmpegBinary.path)
    ffmpeg.setFfprobePath(ffprobeBinary.path)
  } else {
    console.error('ffmpeg or ffprobe path not found')
  }

  ffmpeg()
  .input(inputUrl)
  .inputOptions([
    '-ss 00:00:12',
    '-to 00:01:02',
  ])
  .output('NUL') // Windows 下的 "null sink"
  .outputOptions(['-f', 'null'])
  .addOption('-loglevel', 'debug')
  .addOption('-hide_banner')
  .on('start', commandLine => {
    console.log('Spawned FFmpeg with command:', commandLine);
  })
  .on('stderr', line => {
    console.log('[ffmpeg stderr]', line);
  })
  .on('error', (err) => {
    console.error('FFmpeg error:', err.message);
  })
  .on('end', () => {
    console.log('FFmpeg done');
  })
  .run();
}

getVideoDuration(
  'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744517100&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744516980&caller=webcast.platform_following.core&session_id=20250416151225F68218934EC2ACA9D5B5?vcodec=bytevc1',
)
