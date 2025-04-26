import { Empty, type EmptyProps } from 'antd'

interface ComEmptyProps extends EmptyProps {
  show?: boolean
  content?: React.ReactNode
}

export const ComEmpty: React.FC<ComEmptyProps> = (props) => {
  const { show = true, content, ...rest } = props

  return show ? <Empty {...rest} /> : content
}
