import { ComButton } from '@renderer/components/com'
import { PhMoonStars, PhSunDim, PhDesktop } from '@renderer/components/icon'
import { usePersonalize } from '@renderer/components/PersonalizeProvider'
import { Dropdown, DropdownProps, MenuProps } from 'antd'
import { cloneElement, JSX, useState } from 'react'

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

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)

  const onDropdownClick: MenuProps['onClick'] = ({ key }) => {
    setTheme(key as typeof theme)
  }

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setTooltipOpen(false)
      setPopoverOpen(nextOpen)
    }
  }

  const onButtonMouseEnter = () => {
    if (!popoverOpen) {
      setTimeout(() => {
        setTooltipOpen(true)
      }, 100)
    }
  }

  const onButtonMouseLeave = () => {
    setTimeout(() => {
      setTooltipOpen(false)
    }, 100)
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
      open={popoverOpen}
      menu={{ items: themeItems, onClick: onDropdownClick }}
      placement="top"
      arrow
    >
      <ComButton
        type="text"
        tooltip={{
          title: '主题',
          placement: 'top',
          open: tooltipOpen
        }}
        size="large"
        shape="circle"
        onMouseEnter={onButtonMouseEnter}
        onMouseLeave={onButtonMouseLeave}
      >
        <ReaderIcon />
      </ComButton>
    </Dropdown>
  )
}

export default ChangeTheme
