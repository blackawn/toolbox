import { createClient } from 'naria2'
import { createChildProcess } from '@naria2/node'

const p = await createChildProcess()

const client = await createClient(p)


// const conn = client.conn

// const d = await aria2.tellActive(conn)

// console.log(d)
