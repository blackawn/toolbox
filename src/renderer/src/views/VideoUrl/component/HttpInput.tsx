import { Input } from 'antd'

export const HttpInput = () => {
  return (
    <div className="flex flex-col gap-y-1">
      <Input.TextArea placeholder="输入网址" allowClear autoSize={{ minRows: 4, maxRows: 4 }} />
      <div></div>
    </div>
  )
}
