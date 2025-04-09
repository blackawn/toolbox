import { Tooltip, Button } from 'antd'
import type { TooltipProps, ButtonProps } from 'antd'

export interface ComButtonProps extends ButtonProps {
  tooltip?: TooltipProps
}

export const ComButton: React.FC<ComButtonProps> = (props) => {
  const { tooltip, ...restProps } = props

  return tooltip ? (
    <Tooltip {...tooltip}>
      <Button {...restProps} />
    </Tooltip>
  ) : (
    <Button {...restProps} />
  )
}
