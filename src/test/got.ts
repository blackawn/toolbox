import { Parser } from 'm3u8-parser'
import got from 'got' // 或者 fetch

const url =
  'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744517100&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744516980&caller=webcast.platform_following.core&session_id=20250416151225F68218934EC2ACA9D5B5?vcodec=bytevc1'

async function parseM3U8() {
  try {
    // 1. 下载 M3U8 内容
    const response = await got(url)
    const m3u8Content = response.body

    // 2. 使用 Parser 解析
    const parser = new Parser()
    parser.push(m3u8Content) // 输入内容
    parser.end() // 结束解析

    // 3. 获取解析结果
    const manifest = parser.manifest

    const result: { uri: string; duration: number }[] = []

    let currentTime = 0
    let x = 0
    for (const seg of manifest.segments) {
      const segStart = currentTime
      const segEnd = currentTime + seg.duration

      // 如果该片段有任何部分在你指定的时间段中，就加入
      if (segEnd > 11 && segStart < 38) {
        x += 1
        result.push(seg)
      }

      currentTime = segEnd
    }

    console.log(result)
    console.log(x)
  } catch (error) {
    console.error('解析失败:', error)
  }
}

parseM3U8()
