import { ComButton, ComEllipsis } from '@renderer/components/com'
import { Progress, type ProgressProps } from 'antd'

interface DownloadItem extends Pick<ProgressProps, 'status' | 'percent'> {
  id: number | string
  type: 'video'
  fileName: string
  url: string
  createTime: string
  speed: string
}

const downloadData:DownloadItem[] = [
  {
    id: 1,
    type: 'video',
    fileName: '2025-4-18_19-05.mp4',
    url: 'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744517100&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744516980&caller=webcast.platform_following.core&session_id=20250416151225F68218934EC2ACA9D5B5?vcodec=bytevc1',
    createTime: '2025-4-18 19:05:32',
    status: 'active',
    speed: '7.6M/s',
    percent: 50
  },
  {
    id: 2,
    type: 'video',
    fileName: '2025-4-18_19-05.mp4',
    url: 'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744517100&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744516980&caller=webcast.platform_following.core&session_id=20250416151225F68218934EC2ACA9D5B5?vcodec=bytevc1',
    createTime: '2025-4-18 19:05:32',
    status: 'success',
    speed: '7.6M/s',
    percent: 80
  },
  {
    id: 3,
    type: 'video',
    fileName: '2025-4-18_19-05.mp4',
    url: 'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744517100&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744516980&caller=webcast.platform_following.core&session_id=20250416151225F68218934EC2ACA9D5B5?vcodec=bytevc1',
    createTime: '2025-4-18 19:05:32',
    status: 'normal',
    speed: '7.6M/s',
    percent: 80
  },
  {
    id: 4,
    type: 'video',
    fileName: '2025-4-18_19-05.mp4',
    url: 'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744517100&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744516980&caller=webcast.platform_following.core&session_id=20250416151225F68218934EC2ACA9D5B5?vcodec=bytevc1',
    createTime: '2025-4-18 19:05:32',
    status: 'exception',
    speed: '7.6M/s',
    percent: 10
  }
] as const

export const DownloadList: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-1">
      {downloadData.map((item) => (
        <div
          key={item.id}
          className="flex gap-x-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <div className="size-12 bg-neutral-600"></div>
          <div className="flex-1">
            <div className="flex items-center">
              <div className="flex-1">
                <ComEllipsis>{item.fileName}</ComEllipsis>
              </div>
              <div className="flex items-center gap-x-1">
                <ComButton size="small">复制连接</ComButton>
                <ComButton size="small">重新下载</ComButton>
                <ComButton size="small">取消</ComButton>
              </div>
            </div>
            <div>
              <Progress
                percent={item.percent}
                status={item.status}
                size='small'
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
