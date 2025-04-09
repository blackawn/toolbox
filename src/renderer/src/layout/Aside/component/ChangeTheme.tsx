import { ComButton } from '@renderer/components/com'
import { PhMoonStars, PhSunDim, PhDesktop } from '@renderer/components/icon'
import { usePersonalize } from '@renderer/components/PersonalizeProvider'
import { Dropdown, DropdownProps, MenuProps } from 'antd'
import { cloneElement, JSX, useEffect, useMemo, useState } from 'react'

const themeItems = [
  {
    label: '浅色',
    key: 'light',
    icon: <PhSunDim className="size-4" />
  },
  {
    label: '深色',
    key: 'dark',
    icon: <PhMoonStars className="size-4" />
  },
  {
    label: '系统',
    key: 'system',
    icon: <PhDesktop className="size-4" />
  }
]

export const ChangeTheme = () => {
  const { theme, setTheme } = usePersonalize()

  const [tooltipDisplay, setTooltipDisplay] = useState<boolean>(false)

  const tooltipTitle = useMemo(() => {
    return tooltipDisplay ? null : '主题'
  }, [tooltipDisplay])

  const onDropdownClick: MenuProps['onClick'] = ({ key }) => {
    setTheme(key as typeof theme)
  }

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setTooltipDisplay(nextOpen)
    }
  }

  const ReaderIcon = () => {
    const Icon = themeItems.find((item) => item.key === theme)?.icon as JSX.Element

    return cloneElement(Icon, {
      className: 'size-5'
    })
  }

  return (
    <Dropdown
      trigger={['click']}
      onOpenChange={handleOpenChange}
      menu={{ items: themeItems, onClick: onDropdownClick }}
      placement="top"
      arrow
    >
      <ComButton
        type="text"
        tooltip={{
          title: tooltipTitle,
          placement: 'top'
        }}
        size="large"
        shape="circle"
      >
        <ReaderIcon />
      </ComButton>
    </Dropdown>
  )
}

export default ChangeTheme
