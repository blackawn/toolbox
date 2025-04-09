import {
  PhArrowCircleDown,
  PhGear,
} from '@renderer/components/icon'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import ColorPalette from './ColorPalette'
import ChangeTheme from './ChangeTheme'
import { ComButton } from '@renderer/components/com'

const AppAction: React.FC<any> = () => {
  const navigate = useNavigate()

  return (
    <div className="flex gap-x-0.5">
      <ComButton
        type="text"
        size="large"
        shape="circle"
        tooltip={{
          title: '设置',
          placement: 'top'
        }}
      >
        <PhGear className="size-5" />
      </ComButton>

      <ChangeTheme />
      <ColorPalette />
      <Button type="text" size="large" shape="circle" onClick={() => navigate('download')}>
        <PhArrowCircleDown className="size-5" />
      </Button>
    </div>
  )
}

export default AppAction
