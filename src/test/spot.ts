type ColorObject = {
  id: string
  time: number
  color: string
}

class ObjectPool {
  private colors: string[]
  private maxSize: number
  private pool: ColorObject[] = []
  private counts: number[]

  constructor(colors?: string[]) {
    this.colors = colors ?? []
    this.counts = Array(this.colors.length).fill(0)
    this.maxSize = this.colors.length ? this.colors.length * 2 : Infinity
  }

  private getRandomColor(): string {
    const randHex = () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0')
    return `#${randHex()}${randHex()}${randHex()}`
  }

  add(time: number): ColorObject | null {
    if (this.colors.length && this.pool.length >= this.maxSize) return null

    let colorIdx = this.counts.findIndex((count) => count === 1)

    if (colorIdx === -1) {
      colorIdx = this.counts.findIndex((count) => count === 0)
    }

    if (colorIdx === -1) {
      const newColor = this.getRandomColor()
      this.colors.push(newColor)
      this.counts.push(0)
      colorIdx = this.colors.length - 1
    }

    this.counts[colorIdx]++
    const instanceNum = this.counts[colorIdx]
    const id = `${colorIdx + 1}-${instanceNum}`

    const obj: ColorObject = {
      id,
      time,
      color: this.colors[colorIdx]
    }

    this.pool.push(obj)
    return obj
  }

  remove(id: string): boolean {
    const index = this.pool.findIndex((obj) => obj.id === id)
    if (index === -1) return false

    const [colorPart] = id.split('-')
    const colorIdx = parseInt(colorPart, 10) - 1

    this.counts[colorIdx]--
    this.pool.splice(index, 1)
    return true
  }

  list(): ColorObject[] {
    return [...this.pool]
  }
}

//const pool = new ObjectPool()
const pool = new ObjectPool(['#32A3EE'])

pool.add(1)
const z =pool.add(2)
const x = pool.add(3)
// pool.add(4)
// pool.add(5)
// pool.add(6)

// pool.remove('1-1')
// pool.remove('3-2')

// pool.add(7)
// pool.remove('2-2')

// pool.add(8)
console.log(z,x);
console.log(pool.list())



