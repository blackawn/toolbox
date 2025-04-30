import { ComEllipsis } from '@renderer/components/com'
import { cn } from '@renderer/lib/utils'
import { Button, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import type { CheckboxGroupProps } from 'antd/es/checkbox'

import { memo, useCallback, useEffect, useState } from 'react'

interface ConfigItemProps {
  disabled?: boolean
}

const ConfigItem: React.FC<React.PropsWithChildren<ConfigItemProps>> = ({ disabled, children }) => {
  return (
    <div
      className={cn({
        'cursor-not-allowed': disabled
      })}
    >
      <div
        className={cn('flex items-center justify-between', {
          'pointer-events-none opacity-50': disabled
        })}
      >
        {children}
      </div>
    </div>
  )
}

const Aria2ServerCheckboxGroupOpt: CheckboxGroupProps<boolean>['options'] = [
  { label: '开启', value: true },
  { label: '关闭', value: false }
]

const DownloadPath: React.FC<any> = () => {
  const [downloadPath, setDownloadPath] = useState('')

  async function getDownloadPath() {
    const path = await window.api.storeGet('aria2.dir')
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
        修改
      </Button>
      {/* <Space.Compact>
      <Input defaultValue="Combine input and button" />
      <Button type="primary">修改</Button>
    </Space.Compact> */}
    </div>
  )
}

const Aria2Server: React.FC<any> = memo(() => {
  const [aria2Enabled, setAria2Enable] = useState<boolean>(true)

  const onAria2ModifyState = useCallback(async (e: RadioChangeEvent) => {
    const state = e.target.value

    const result = await window.api.aria2State(state)

    setAria2Enable(result)
  }, [])

  useEffect(() => {
    async function getAria2Client() {
      const enabled = await window.api.aria2Client()
      setAria2Enable(enabled)
    }

    getAria2Client()
  }, [])

  return (
    <div className="flex flex-col gap-y-2.5">
      <ConfigItem>
        <div>服务状态</div>
        <Radio.Group
          block
          options={Aria2ServerCheckboxGroupOpt}
          value={aria2Enabled}
          optionType="button"
          buttonStyle="solid"
          size="middle"
          onChange={onAria2ModifyState}
        />
      </ConfigItem>
      <ConfigItem disabled={aria2Enabled}>
        <div>下载路径</div>
        <DownloadPath />
      </ConfigItem>
    </div>
  )
})

const Setting: React.FC<any> = () => {
  return (
    <div>
      <div className="rounded-md p-3 dark:bg-neutral-700">
        <h2 className="text-base">Naria2</h2>
        <div className="my-3 border-t border-t-neutral-200 dark:border-t-neutral-600"></div>
        <div className="flex flex-col gap-y-2">
          <Aria2Server />
        </div>
      </div>
    </div>
  )
}

export default Setting
