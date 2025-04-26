const a: {
  id: string
  time: number
  color: string
}[] = [
  {
    id: '1-1',
    time: 10.1,
    color: '#4CA14C'
  },
  {
    id: '1-2',
    time: 18,
    color: '#4CA14C'
  },
  {
    id: '3-2',
    time: 67.099999,
    color: '#A4C0DD'
  },
  {
    id: '2-2',
    time: 28.9,
    color: '#3E93FC'
  },
  {
    id: '3-1',
    time: 55.7,
    color: '#A4C0DD'
  },
  {
    id: '4-2',
    time: 62.7,
    color: '#5A8025'
  },
  {
    id: '4-1',
    time: 48.8,
    color: '#5A8025'
  },
  {
    id: '6-2',
    time: 23.5,
    color: '#2AF064'
  },
  {
    id: '5-1',
    time: 73.3,
    color: '#8CBAA8'
  },
  {
    id: '5-2',
    time: 83.7,
    color: '#8CBAA8'
  },
  {
    id: '6-1',
    time: 45.1,
    color: '#2AF064'
  },

  {
    id: '8-1',
    time: 76.5,
    color: '#9572CC'
  },
  {
    id: '7-2',
    time: 52.1,
    color: '#4120C3'
  },
  {
    id: '7-1',
    time: 36.8,
    color: '#4120C3'
  }
]

const sorted = a.toSorted((a, b) => {
  const aPrefix = parseInt(a.id.split('-')[0])
  const bPrefix = parseInt(b.id.split('-')[0])
  if (aPrefix !== bPrefix) return aPrefix - bPrefix
  return a.time - b.time
})


const result = Object.values(
  sorted.reduce((acc, curr) => {
    const [prefix] = curr.id.split('-')
    
    if (!acc[prefix]) {
      acc[prefix] = {
        id: prefix,
        startTime: curr.time,
        endTime: null,
        color: curr.color
      }
    } else {
      acc[prefix].endTime = curr.time
    }
    
    return acc
  }, {} as Record<string, { id: string; startTime: number; endTime: number | null; color: string }>)
)

console.log(result)
console.log(sorted);
