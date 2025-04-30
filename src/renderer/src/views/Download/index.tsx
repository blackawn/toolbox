// import { ComEllipsis } from '@renderer/components/com/ComEllipsis'
import { Button, Tabs, TabsProps } from 'antd'
import { useEffect } from 'react'
import { DownloadList } from './DownloadList'

const Downloading = () => {
  function getVersion() {
    window.electron.ipcRenderer.send('aria2-get-version')
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('aria2-get-version-reply', (_, data) => {
      console.log(data)
    })
  }, [])

  return (
    <div>
      <Button onClick={getVersion}>get version</Button>
    </div>
  )
}

const items: TabsProps['items'] = [
  {
    key: 'all',
    label: '全部',
    children: <DownloadList />
  },
  {
    key: 'downloading',
    label: '下载中',
    children: <Downloading />
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
