// import { ComEllipsis } from '@renderer/components/com/ComEllipsis'
import { Button, Progress, Tabs, TabsProps } from 'antd'
import { useEffect } from 'react'
import { DownloadList } from './DownloadList'
import { nanoid } from 'nanoid'
import { ComButton, ComEllipsis } from '@renderer/components/com'
import { PhPlayFill, PhPauseFill, PhStopFill } from '@renderer/components/icon'
const a = [
  {
    bitfield: '00',
    completedLength: '1032192',
    connections: '0',
    dir: 'F:\\\\download',
    downloadSpeed: '0',
    files: [
      {
        completedLength: '0',
        index: '1',
        length: '2749876',
        path: 'F://download/4000-20250429T013949.485-0-1745861746.1.ts',
        selected: 'true',
        uris: [
          {
            status: 'used',
            uri: 'https://lf-record-tos.bvfcdn2.com/obj/fcdnlarge3-fcdn-dy/44675577193231729341/push-rtmp-t5.douyincdn.com/third/2025-04-29/stream-117162788878811962/4000-20250429T013949.485-0-1745861746.ts'
          },
          {
            status: 'waiting',
            uri: 'https://lf-record-tos.bvfcdn2.com/obj/fcdnlarge3-fcdn-dy/44675577193231729341/push-rtmp-t5.douyincdn.com/third/2025-04-29/stream-117162788878811962/4000-20250429T013949.485-0-1745861746.ts'
          }
        ]
      }
    ],
    gid: '833ef354057fc6c9',
    numPieces: '3',
    pieceLength: '1048576',
    status: 'paused',
    totalLength: '2749876',
    uploadLength: '0',
    uploadSpeed: '0'
  },
  {
    completedLength: '0',
    connections: '0',
    dir: 'F:\\\\download',
    downloadSpeed: '0',
    files: [
      {
        completedLength: '0',
        index: '1',
        length: '0',
        path: '',
        selected: 'true',
        uris: [
          {
            status: 'waiting',
            uri: 'https://lf-record-tos.bvfcdn2.com/obj/fcdnlarge3-fcdn-dy/44675577193231729341/push-rtmp-t5.douyincdn.com/third/2025-04-29/stream-117162788878811962/4000-20250429T013941.499-0-1745861744.ts'
          }
        ]
      }
    ],
    gid: 'c723e268e9a04bfc',
    numPieces: '0',
    pieceLength: '1048576',
    status: 'paused',
    totalLength: '0',
    uploadLength: '0',
    uploadSpeed: '0'
  }
] as const

const Downloading = () => {
  function getVersion() {
    window.electron.ipcRenderer.send('aria2-get-version')
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:6800/jsonrpc')

    ws.onopen = () => {
      const params: [
        {
          methodName: Aria2Method
          params?: any
        }[]
      ] = [
        [
          {
            methodName: 'aria2.tellActive'
          },
          {
            methodName: 'aria2.tellWaiting',
            params: [0, 1000]
          },
          {
            methodName: 'aria2.tellStopped',
            params: [0, 1000]
          },
          {
            methodName: 'aria2.getGlobalStat'
          }
        ]
      ]

      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          id: nanoid(16),
          method: 'system.multicall',
          params
        })
      )
    }
    ws.onmessage = (e) => {
      console.log(JSON.parse(e.data))
    }
    ws.onclose = () => {
      console.log('ws close')
    }
    ws.onerror = (e) => {
      console.log('ws error', e)
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div>
      {a.map((item) => (
        <div key={item.gid} className="flex flex-col">
          <div className="flex justify-between items-center">
            <ComEllipsis className='text-xs'>{item.files[0].uris[0].uri}</ComEllipsis>
            <div className='flex ml-4'>
              <ComButton type="text" size="small" shape="circle">
                <PhPlayFill width={12} height={12} />
              </ComButton>
              <ComButton type="text" size="small" shape="circle">
                <PhPauseFill width={12} height={12} />
              </ComButton>
              <ComButton type="text" size="small" shape="circle">
                <PhStopFill width={12} height={12} />
              </ComButton>
            </div>
          </div>
          <Progress
            percent={((Number(item.completedLength) / Number(item.totalLength)) * 100) | 0}
            size="small"
          />
        </div>
      ))}
    </div>
  )
}

const items: TabsProps['items'] = [
  {
    key: 'all',
    label: '全部',
    children: <Downloading />
  },
  {
    key: 'downloading',
    label: '下载中',
    children: <DownloadList />
  },
  {
    key: 'completed',
    label: '已完成',
    children: <DownloadList />
  }
]

const Download: React.FC<any> = () => {
  const onChange = () => {}

  return (
    <div>
      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
    </div>
  )
}

export default Download
