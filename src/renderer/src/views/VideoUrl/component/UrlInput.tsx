import { Input, Button } from 'antd'

const UrlInput = () => {
  const handleOpenUrl = () => {
    window.electron.ipcRenderer.send('open-url', {
      url: 'https://livedata.douyin.com/live/'
    })
  }

  const handleCloseAllChildWindow = () => {
    window.electron.ipcRenderer.send('close-all-child-window')
  }

  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex gap-x-1">
        <Input.TextArea placeholder="输入网址" allowClear className='dark:!bg-neutral-700' autoSize={{ minRows: 4, maxRows: 4 }} />
        <div className="flex flex-col gap-y-1">
          <Button onClick={handleOpenUrl} color="green" variant="solid">
            打开
          </Button>
          <Button color="blue" variant="solid">
            历史记录
          </Button>
          <Button onClick={handleCloseAllChildWindow} color="danger" variant="solid">
            关闭所有
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UrlInput
