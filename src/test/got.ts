import { Parser } from 'm3u8-parser'
import got from 'got' // 或者 fetch
import path from 'path'
import fs from 'fs'

const url =
  'https://lf-record-tos.bvfcdn2.com/obj/fcdnlarge3-fcdn-dy/44675577193231729341/push-rtmp-t5.douyincdn.com_third_stream-117162788878811962_1745861665_1745864205_record.m3u8?vcodec=bytevc1'
// const url =
//   'https://lr13.douyincdn.com/record/third/stream-117072359751942931/20250413111523.m3u8?psm=webcast.replay.biz?vcodec=bytevc1'

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

    const segments = manifest.segments
    if (!segments || segments.length === 0) {
      console.error('没有找到 ts 片段')
      process.exit(1)
    }

    const baseUrl = new URL(url)
    const basePath = baseUrl.origin

    console.log(basePath)

    const urls = segments.map((seg) => {
      return seg.uri.startsWith('http') ? seg.uri : basePath + seg.uri
    })

    // // 4. 写入 txt 文件
    fs.writeFileSync('ts_download_list.txt', urls.join('\n'), 'utf-8')
  } catch (error) {
    console.error('解析失败:', error)
  }
}

parseM3U8()
