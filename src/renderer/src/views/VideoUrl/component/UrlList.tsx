import { ComEllipsis, ComButton, ComEmpty } from '@renderer/components/com'
import { Tag, Empty } from 'antd'
import { VideoPlayer } from '@renderer/components/VideoPlayer'
import type { VideoPlayerProps, Spot } from '@renderer/components/VideoPlayer'
import { useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { GameIconsTallyMark5, PhArrowLineDown } from '@renderer/components/icon'
import type { OnCompletedListenerDetails } from 'electron'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'
import { SpotModal } from './SpotModal'
import type { SpotModalProps } from './SpotModal'

export type RequestDetail = Pick<
  OnCompletedListenerDetails,
  'id' | 'method' | 'url' | 'timestamp' | 'resourceType' | 'statusCode'
> & {
  duration?: number | string
  vtype?: string
  spot?: Spot[]
}

export interface UrlListRef {
  clearRequestDetails: () => void
}

export interface UrlListProps {
  ref?: React.Ref<UrlListRef>
  onChangeRequestDetails?: (data: RequestDetail[]) => void
}

dayjs.extend(duration)

const UrlList: React.FC<UrlListProps> = ({ ref, onChangeRequestDetails }) => {
  const [requestDetails, setRequestDetails] = useState<RequestDetail[]>([
    {
      url: 'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744517100&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744516980&caller=webcast.platform_following.core&session_id=20250416151225F68218934EC2ACA9D5B5?vcodec=bytevc1',
      id: 3535,
      method: 'GET',
      resourceType: 'xhr',
      timestamp: 1744787666068.208,
      statusCode: 200
    }
    // {
    //   url: 'https://pull-hls-l13-admin.douyincdn.com/third/stream-117072359751942931/index.m3u8?end=1744515960&expire=1746083545&sign=c5854853777fb3f5f17eb9ba1a5e334d&start=1744515780&caller=webcast.platform_following.core&session_id=2025041615122564FDC384D8600D9A46F2?vcodec=bytevc1',
    //   id: 342130,
    //   method: 'GET',
    //   resourceType: 'xhr',
    //   timestamp: 1744787666086.577,
    //   statusCode: 200
    // },
    // {
    //   url: 'https://lr13.douyincdn.com/record/third/stream-117072359751942931/20250413111523.m3u8?psm=webcast.replay.biz?vcodec=bytevc1',
    //   id: 321336,
    //   method: 'GET',
    //   resourceType: 'xhr',
    //   timestamp: 1744787666310.376,
    //   statusCode: 200
    // }
  ])

  const [spotModalOpen, setSpotModalOpen] = useState(false)

  const [spot, setSpot] = useState<Spot[]>([])

  const onPlayerLoad = useCallback(
    (data: any) => {
      const { url, duration, vtype } = data

      const findIndex = requestDetails.findIndex((item) => item.url === url)
      if (findIndex === -1) return

      setRequestDetails((prev) => {
        const newDetails = [...prev]
        newDetails[findIndex] = {
          ...newDetails[findIndex],
          duration: dayjs.duration(duration, 'seconds').format('HH:mm:ss'),
          vtype
        }
        return newDetails
      })
    },
    [requestDetails]
  )

  const onPlayerSpotChange = useCallback((data: CP<VideoPlayerProps['onSpotChange'], 0>) => {
    const { url, spot } = data

    const findIndex = requestDetails.findIndex((item) => item.url === url)
    if (findIndex !== -1) {
      console.log(spot)
      setRequestDetails((prev) => {
        const newDetails = [...prev]
        newDetails[findIndex] = {
          ...newDetails[findIndex],
          spot
        }
        return newDetails
      })
    }
  }, [])

  const handleCheckSlice = (url: string) => {
    const findIndex = requestDetails.findIndex((item) => item.url === url)
    if (findIndex === -1) return
    const spot = requestDetails[findIndex].spot || []
    setSpot(spot)
    setSpotModalOpen(true)
  }

  const handleUrlDownloadClick = (url: string) => {
    window.electron.ipcRenderer.send('ffmpeg-download-url', url)
  }

  function onWebRequestCompletedDetails() {
    window.electron.ipcRenderer.on('get-video-request-details', (_, details: RequestDetail) => {
      const findIndex = requestDetails.findIndex((item) => item.url === details.url)
      if (findIndex === -1) return

      setRequestDetails((prev) => {
        return [details, ...prev]
      })
    })
  }

  const onSpotModalDownload: SpotModalProps['onDownload'] = (data) => {
    console.log(data)
  }

  useEffect(() => {
    onChangeRequestDetails?.(requestDetails)
  }, [requestDetails])

  useEffect(() => {
    onWebRequestCompletedDetails()
  }, [])

  useImperativeHandle(ref, () => {
    return {
      clearRequestDetails: () => setRequestDetails([])
    }
  }, [])

  return (
    <ComEmpty
      className="flex size-full flex-col items-center justify-center"
      image={Empty.PRESENTED_IMAGE_DEFAULT}
      description="暂无视频地址"
      show={requestDetails.length === 0}
      content={
        <div>
          <SpotModal
            spot={spot}
            open={spotModalOpen}
            onDownload={onSpotModalDownload}
            onCancel={() => setSpotModalOpen(false)}
          />
          <div>
            {requestDetails.map((item) => (
              <div
                className="group flex items-start gap-x-2 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                key={item.id}
              >
                <VideoPlayer
                  url={item.url}
                  onLoaded={onPlayerLoad}
                  onSpotChange={onPlayerSpotChange}
                  className="thumbnail-player h-28 w-40"
                />
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="my-1 flex items-center">
                    <div className="flex-1">
                      <Tag color="blue">{item.duration || '00:00:00'}</Tag>
                      <Tag color="volcano">{item.vtype || 'unkown'}</Tag>
                    </div>
                    <div className="flex gap-x-1">
                      {item.spot?.length && (
                        <ComButton
                          tooltip={{
                            title: '查看切片'
                          }}
                          shape="circle"
                          size="small"
                          type="text"
                          onClick={() => handleCheckSlice(item.url)}
                        >
                          <GameIconsTallyMark5 className="size-4" />
                        </ComButton>
                      )}
                      <ComButton
                        tooltip={{
                          title: '下载'
                        }}
                        shape="circle"
                        size="small"
                        type="text"
                        onClick={() => handleUrlDownloadClick(item.url)}
                      >
                        <PhArrowLineDown className="size-4" />
                      </ComButton>
                    </div>
                  </div>
                  <ComEllipsis tooltip={false} className="text-sm text-neutral-400" lineClamp={4}>
                    {item.url}
                  </ComEllipsis>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  )
}

export default UrlList
