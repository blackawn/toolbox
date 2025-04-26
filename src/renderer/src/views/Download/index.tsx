import { ComEllipsis } from '@renderer/components/com/ComEllipsis'
import { Button, Tabs, TabsProps } from 'antd'
import { useEffect, useState } from 'react'
import { DownloadList } from './DownloadList'

const items: TabsProps['items'] = [
  {
    key: 'all',
    label: '全部',
    children: <DownloadList />
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

const DownloadPath: React.FC<any> = () => {
  const [downloadPath, setDownloadPath] = useState('')

  async function getDownloadPath() {
    const path = await window.api.storeGet('downloadPath')
    setDownloadPath(path)
  }

  const handleChangeDownloadPathClick = async () => {
    const result = await window.api.dialogSelectPath()
    if (!result.canceled) {
      getDownloadPath()
    }
  }

  useEffect(() => {
    getDownloadPath()
  }, [])

  return (
    <div className="flex items-center gap-x-1">
      <ComEllipsis
        style={{
          maxWidth: '300px'
        }}
      >
        {downloadPath}
      </ComEllipsis>
      <Button type="primary" size="small" onClick={handleChangeDownloadPathClick}>
        修改路径
      </Button>
    </div>
  )
}

const Download: React.FC<any> = () => {
  const onChange = () => {}

  return (
    <div>
      <Tabs
        defaultActiveKey="all"
        items={items}
        onChange={onChange}
        className="tabs-download"
        tabBarExtraContent={{
          right: <DownloadPath />
        }}
      />
    </div>
  )
}

export default Download
