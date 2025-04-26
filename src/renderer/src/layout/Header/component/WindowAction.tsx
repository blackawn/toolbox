import { PhCopySimple, PhX, PhMinus } from '@renderer/components/icon'
import { Button } from 'antd'

const actions = [
  {
    id: 'PhMinus',
    icon: <PhMinus className="size-4" />,
    onClick() {
      window.electron.ipcRenderer.send('window-minimize')
    }
  },
  {
    id: 'PhCopySimple',
    icon: <PhCopySimple className="size-4" />,
    onClick() {
      window.electron.ipcRenderer.send('window-maximize')
    }
  },
  {
    id: 'PhX',
    icon: <PhX className="size-4" />,
    onClick() {
      window.electron.ipcRenderer.send('window-close')
    }
  }
]

const WindowAction: React.FC<any> = () => {
  return (
    <div className="no-app-darg">
      {actions.map(({ id, onClick, icon }) => (
        <Button key={id} onClick={onClick} type="text" className="!rounded-none">
          {icon}
        </Button>
      ))}
    </div>
  )
}

export default WindowAction
