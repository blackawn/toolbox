import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration.js'

dayjs.extend(duration)

//console.log(dayjs.duration(79.99921, 'second').format('HH:mm:ss'))

const date1 = dayjs('2025-04-13T12:03:06+0800')
const date2 = dayjs('2025-04-13T12:03:34+0800')

const d = date2.diff(date1, 'second')


console.log(d);
