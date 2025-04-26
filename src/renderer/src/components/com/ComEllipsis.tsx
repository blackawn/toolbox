import { Tooltip } from 'antd'
import type { TooltipProps } from 'antd'
import { cn } from '@renderer/lib/utils'
import { useEffect, useRef, useState } from 'react'

interface ComEllipsisProps extends React.HTMLAttributes<HTMLSpanElement> {
  lineClamp?: number
  tooltip?: boolean | TooltipProps
}

export const ComEllipsis: React.FC<ComEllipsisProps> = ({
  children,
  style,
  lineClamp,
  tooltip = true,
  className
}) => {
  const wrapRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const [tooltipDisabled, setTooltipDisabled] = useState(false)

  function getTooltipDisabled() {
    const { current: elWrap } = wrapRef

    if (!elWrap) return

    if (lineClamp) {
      setTooltipDisabled(elWrap.scrollHeight <= elWrap.offsetHeight)
    } else {
      const { current: elContent } = contentRef
      if (!elContent) return

      setTooltipDisabled(
        elContent.getBoundingClientRect().width <= elWrap.getBoundingClientRect().width
      )
    }
  }

  useEffect(() => {
    getTooltipDisabled()
  }, [children])

  const lineClampStyle: React.CSSProperties = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: lineClamp
  }

  const tooltipProps = typeof tooltip === 'boolean' ? {} : tooltip

  const renderContent = () => {
    const wrapStyle = lineClamp ? { ...style, ...lineClampStyle } : style

    return (
      <p
        ref={wrapRef}
        style={wrapStyle}
        className={cn(!lineClamp && 'truncate', 'break-all', className)}
      >
        {lineClamp ? children : <span ref={contentRef}>{children}</span>}
      </p>
    )
  }

  return tooltip ? (
    <Tooltip {...tooltipProps} title={tooltipDisabled ? null : children}>
      {renderContent()}
    </Tooltip>
  ) : (
    renderContent()
  )
}
