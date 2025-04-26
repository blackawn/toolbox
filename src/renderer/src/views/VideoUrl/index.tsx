import React, { useRef, useState } from 'react'
import UrlInput from './component/UrlInput'
import UrlList, { type UrlListRef } from './component/UrlList'
import { ComButton } from '@renderer/components/com'
import { MaterialSymbolsLightDeleteSweepOutlineRounded } from '@renderer/components/icon'
import { cn } from '@renderer/lib/utils'

const VideoUrl: React.FC<any> = () => {
  const urlListRef = useRef<UrlListRef>(null)

  const [visibleClear, setVisibleClear] = useState<boolean>(false)
  const handleClearUrlList = () => {
    urlListRef.current?.clearRequestDetails()
  }

  function onChangeRequestDetails(data: any) {
    setVisibleClear(data.length > 0)
  }

  return (
    <div className="flex h-full flex-col">
      <UrlInput />
      <div className="my-2 flex items-center gap-x-1">
        <span>已获取的视频地址</span>
        <ComButton
          className={cn({
            'pointer-events-none invisible opacity-0': !visibleClear
          })}
          tooltip={{
            title: '清空'
          }}
          shape="circle"
          type="text"
          onClick={handleClearUrlList}
        >
          <MaterialSymbolsLightDeleteSweepOutlineRounded className="size-6.5" />
        </ComButton>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="main-scrollbar relative h-full overflow-x-hidden">
          <UrlList ref={urlListRef} onChangeRequestDetails={onChangeRequestDetails} />
        </div>
      </div>
    </div>
  )
}

export default VideoUrl
