import { ComButton } from '@renderer/components/com'
import { usePersonalize } from '@renderer/components/PersonalizeProvider'
import { Button, Popover } from 'antd'
import { useMemo, useState } from 'react'
import { PhPalette, PhCheck } from '@renderer/components/icon'
import { parseOklchToHexa } from '@renderer/lib/oklchToHexa'
import twColors from 'tailwindcss/colors'

const ColorItem = () => {
  const { color, setColor } = usePersonalize()

  const themes = useMemo(() => {
    return Object.keys(twColors).filter((key) => {
      const colorKeys = Object.keys(twColors)
      const neutralIndex = colorKeys.indexOf('neutral')
      if (neutralIndex === -1) return true
      return colorKeys.indexOf(key) >= neutralIndex
    })
  }, [])

  const handleChangeColor = (color: string) => {
    setColor(parseOklchToHexa(color))
  }

  return (
    <div className="grid grid-cols-6 gap-1">
      {themes.map((key) => {
        return (
          <Button
            key={key}
            style={{ backgroundColor: twColors[key][500] }}
            size="small"
            shape="circle"
            onClick={() => handleChangeColor(twColors[key][500])}
            icon={
              color === parseOklchToHexa(twColors[key][500]) ? (
                <PhCheck className="size-4 !text-neutral-50" />
              ) : null
            }
          />
        )
      })}
    </div>
  )
}

export const ColorPalette = () => {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)

  const handleOpenChange = (open: boolean) => {
    setTooltipOpen(false)
    setPopoverOpen(open)
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

  return (
    <Popover
      onOpenChange={handleOpenChange}
      content={ColorItem}
      trigger={['click']}
      placement="top"
      arrow
    >
      <ComButton
        type="text"
        tooltip={{
          title: '颜色',
          placement: 'top',
          open: tooltipOpen
        }}
        size="large"
        shape="circle"
        onMouseEnter={onButtonMouseEnter}
        onMouseLeave={onButtonMouseLeave}
      >
        <PhPalette className="size-5" />
      </ComButton>
    </Popover>
  )
}

export default ColorPalette
