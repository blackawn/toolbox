
import { PhMagnifyingGlass, PhFileVideo } from '@renderer/components/icon'
import { useEffect, useRef } from 'react'
import { type OnCompletedListenerDetails } from 'electron'
import { HttpInput } from './component/HttpInput'

const paths = [
  {
    id: 384,
    url: 'https://pull-hls-l3-admin.douyincdn.com/third/stream-7489620087151184650.m3u8?aliyunols=on&auth_key=1745159722-0-0-ef07d9e63df6071d87a6baf64a278968&lhs_start=1&lhs_start_unix_s_0=1743814020&lhs_vodend_unix_s_0=1743814140&caller=webcast.platform_following.core&session_id=20250405230522371A4D70BFAB46D16032?vcodec=bytevc1',
    method: 'GET',
    resourceType: 'xhr',
    statusCode: 200,
    icon: <PhFileVideo className="size-4" />
  },
  {
    id: 385,
    url: 'https://pull-hls-l3-admin.douyincdn.com/third/stream-7489620087151184650.m3u8?aliyunols=on&auth_key=1745159722-0-0-ef07d9e63df6071d87a6baf64a278968&lhs_start=1&lhs_start_unix_s_0=1743814020&lhs_vodend_unix_s_0=1743814140&caller=webcast.platform_following.core&session_id=20250405230522371A4D70BFAB46D16032?vcodec=bytevc1',
    method: 'GET',
    resourceType: 'xhr',
    statusCode: 200,
    icon: <PhFileVideo className="size-4" />
  }
]

const VideoUrl: React.FC<any> = () => {
  const browserViewRef = useRef<HTMLDivElement | null>(null)

  // 更新WebContentsView的尺寸和位置
  const updateWebContentsViewBounds = () => {
    if (browserViewRef.current) {
      const rect = browserViewRef.current.getBoundingClientRect()
      window.electron.ipcRenderer.send('update-web-contents-view', {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height
      })
    }
  }

  // useEffect(() => {
  //   // 当组件挂载后，通知主进程创建WebContentsView
  //   if (browserViewRef.current) {
  //     const rect = browserViewRef.current.getBoundingClientRect()

  //     window.electron.ipcRenderer.send('create-web-contents-view', {
  //       x: rect.x,
  //       y: rect.y,
  //       width: rect.width,
  //       height: rect.height,
  //       url: 'https://livedata.douyin.com' // 可以根据需要修改URL
  //     })

  //     window.electron.ipcRenderer.on('window-resized', () => {
  //       updateWebContentsViewBounds()
  //     })
  //   }

  //   return () => {
  //     window.electron.ipcRenderer.send('destroy-web-contents-view')
  //   }
  // }, [])

  return (
    <div className="flex h-full flex-col">
      <HttpInput/>

      <div className="flex-1 overflow-hidden">

      </div>
    </div>
  )
}

export default VideoUrl
