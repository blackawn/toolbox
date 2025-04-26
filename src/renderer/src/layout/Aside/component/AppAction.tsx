import { PhArrowCircleDown, PhGear } from '@renderer/components/icon'
import { useNavigate } from 'react-router-dom'
import ColorPalette from './ColorPalette'
import ChangeTheme from './ChangeTheme'
import { ComButton } from '@renderer/components/com'
import { Badge } from 'antd'

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

      <Badge count={5} offset={[-4,6]}>
        <ComButton
          type="text"
          size="large"
          shape="circle"
          tooltip={{
            title: '下载',
            placement: 'top'
          }}
          onClick={() => navigate('download')}
        >
          <PhArrowCircleDown className="size-5" />
        </ComButton>
      </Badge>
    </div>
  )
}

export default AppAction
