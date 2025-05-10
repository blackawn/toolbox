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


const downloadData: DownloadItem[] = [] as const

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
              <Progress percent={item.percent} status={item.status} size="small" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
