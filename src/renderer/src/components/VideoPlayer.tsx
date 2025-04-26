import { memo, useEffect, useRef } from 'react'
import Player, { Events, Plugin } from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'
import { cn } from '@renderer/lib/utils'
import color from 'color'

export interface Spot {
  id: string
  time: number
  color: string
}

export interface VideoPlayerProps {
  url?: string
  className?: string
  onLoaded?: (data: any) => void
  onSpotChange?: (data: { url: string; spot: Spot[] }) => void
}

const { POSITIONS } = Plugin

class MarkPlugin extends Plugin {
  private elAdd: HTMLDivElement | null = null
  private elRemove: HTMLDivElement | null = null
  private handleAddClick?: () => void
  private handleRemoveClick?: () => void
  private progressPreviewInst: any = null
  private progressInst: any = null
  private currentSpotId: string | null = null

  private colors: string[] = []
  private maxSize: number = Infinity
  private pool: Spot[] = []
  private colorUsage: Map<number, Set<number>> = new Map()

  static get pluginName() {
    return 'MarkPlugin'
  }

  static get defaultConfig() {
    return {
      position: POSITIONS.CONTROLS_CENTER,
      colors: []
    }
  }

  constructor(args: any) {
    super(args)
    this.colors = args?.config?.colors ?? []
    this.maxSize = this.colors.length ? this.colors.length * 2 : Infinity
    this.colors.forEach((_, idx) => {
      this.colorUsage.set(idx, new Set())
    })
  }

  private getRandomColor(): string {
    const randHex = () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0')
    return color(`#${randHex()}${randHex()}${randHex()}`).lighten(0.1).hex()
  }

  private getNextInstanceNumber(colorIdx: number): number {
    const usedNumbers = this.colorUsage.get(colorIdx) || new Set()
    let instanceNum = 1
    while (usedNumbers.has(instanceNum)) {
      instanceNum++
    }
    return instanceNum
  }

  private addSpot(time: number): Spot | null {
    if (this.colors.length && this.pool.length >= this.maxSize) return null

    let colorIdx = -1
    for (let i = 0; i < this.colors.length; i++) {
      const usedNumbers = this.colorUsage.get(i)
      if (!usedNumbers || usedNumbers.size < 2) {
        colorIdx = i
        break
      }
    }

    if (colorIdx === -1) {
      const newColor = this.getRandomColor()
      this.colors.push(newColor)
      colorIdx = this.colors.length - 1
      this.colorUsage.set(colorIdx, new Set())
    }

    const instanceNum = this.getNextInstanceNumber(colorIdx)
    this.colorUsage.get(colorIdx)?.add(instanceNum)

    const id = `${colorIdx + 1}-${instanceNum}`
    const obj: Spot = {
      id,
      time,
      color: this.colors[colorIdx]
    }

    this.pool.push(obj)
    return obj
  }

  private removeSpot(id: string): boolean {
    const index = this.pool.findIndex((obj) => obj.id === id)
    if (index === -1) return false

    const [colorPart, instancePart] = id.split('-')
    const colorIdx = parseInt(colorPart, 10) - 1
    const instanceNum = parseInt(instancePart, 10)

    const usedNumbers = this.colorUsage.get(colorIdx)
    if (usedNumbers) {
      usedNumbers.delete(instanceNum)
    }

    this.pool.splice(index, 1)
    return true
  }

  private listSpots(): Spot[] {
    return [...this.pool]
  }

  setSpotId(id: string | null) {
    this.currentSpotId = id

    const elAdd = this.elAdd
    const elRemove = this.elRemove

    if (!elAdd || !elAdd.parentElement || !elRemove || !elRemove.parentElement) {
      return
    }

    const isSet = Boolean(id)

    elAdd.style.opacity = isSet ? '0.5' : '1'
    elAdd.style.pointerEvents = isSet ? 'none' : 'auto'
    elAdd.parentElement.style.pointerEvents = isSet ? 'none' : 'auto'

    elRemove.style.opacity = isSet ? '1' : '0.5'
    elRemove.style.pointerEvents = isSet ? 'auto' : 'none'
    elRemove.parentElement.style.pointerEvents = isSet ? 'auto' : 'none'
  }

  beforePlayerInit() {
    this.setStyle('cursor', 'auto')
  }

  afterPlayerInit() {}

  afterCreate() {
    this.elAdd = this.find('.target-add') as HTMLDivElement
    this.elRemove = this.find('.target-remove') as HTMLDivElement

    this.handleAddClick = () => {
      const currentTime = this.player.currentTime
      const spot = this.addSpot(currentTime)

      if (spot) {
        const _spot = {
          ...spot,
          text: `(${currentTime} ${spot.id})`,
          style: {
            backgroundColor: spot.color
          }
        }
        this.progressPreviewInst.createDot(_spot)
        this.setSpotId(spot.id)
        this.emit('on-spot-change', this.listSpots())
      }
    }

    this.handleRemoveClick = () => {
      if (this.currentSpotId) {
        this.progressPreviewInst.deleteDot(this.currentSpotId)
        this.removeSpot(this.currentSpotId)
        this.setSpotId(null)
        this.emit('on-spot-change', this.listSpots())
      }
    }

    this.elAdd?.addEventListener('click', this.handleAddClick)
    this.elRemove?.addEventListener('click', this.handleRemoveClick)
  }

  onPluginsReady() {
    this.progressPreviewInst = this.player.getPlugin('progresspreview')
    this.progressInst = this.player.getPlugin('progress')

    if (this.progressInst) {
      this.progressInst.addCallBack('click', (data: any) => {
        Promise.resolve().then(() => {
          this.setSpotId(data.id)
        })
      })
    }
  }

  destroy() {
    if (this.handleAddClick && this.elAdd) {
      this.elAdd.removeEventListener('click', this.handleAddClick)
    }
    if (this.handleRemoveClick && this.elRemove) {
      this.elRemove.removeEventListener('click', this.handleRemoveClick)
    }
  }

  render() {
    return `
    <div class="flex justify-center pt-1 gap-x-3">
      <xg-icon style="margin: 0;pointer-events: none">
        <div class="target-add" style="width: 22px; height: 22px; opacity: 0.5;pointer-events: none">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8"
            />
          </svg>
        </div>
        <span class="xg-tips">添加标记</span>
      </xg-icon>
      <xg-icon style="margin: 0;pointer-events: none">
        <div class="target-remove" style="width: 22px; height: 22px; opacity: 0.5;pointer-events: none">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8"
            />
          </svg>
        </div>
        <span class="xg-tips">删除标记</span>
      </xg-icon>
    </div>
    `
  }
}

export const VideoPlayer: React.FC<VideoPlayerProps> = memo((props) => {
  const { url, className, onLoaded, onSpotChange } = props
  const playerRef = useRef<Player | null>(null)
  const playerContainer = useRef<HTMLDivElement>(null)
  console.log('video');

  useEffect(() => {
    const el = playerContainer.current

    if (url && el) {
      playerRef.current = new Player({
        el,
        url,
        height: el.offsetHeight,
        width: el.offsetWidth,
        volume: 0,
        seekedStatus: 'pause',
        commonStyle: {
          progressColor: '#262626',
          cachedColor: '#404040',
          playedColor: '#737373'
        },
        plugins: [MarkPlugin, HlsPlugin],
        hls: {
          preloadTime: 1
        }
      })

      if (playerRef.current) {
        playerRef.current.on(Events.LOADED_DATA, (data) => {
          onLoaded?.({
            url,
            ...data
          })
        })

        playerRef.current.on('on-spot-change', (spot) => {
          onSpotChange?.({
            url,
            spot
          })
        })
      }
    }

    return () => {
      playerRef.current?.destroy()
    }
  }, [])

  return <div ref={playerContainer} className={cn(className)}></div>
})
