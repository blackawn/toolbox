import fs from 'fs'
import path from 'path'

import * as child_process from 'child_process'
const { addx } = require('./demo')

module.exports = { add }

enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}

const abc = {
  iphone: 'iphone',
  huawei: 'huawei'

}

console.log(Color.Red);


Object.apply

namespace TypeScript {
  export interface Jsx {
    color: string
    c: string
  }

  export type Jsx2 = string
}

interface Inter {
  key?: string
}

type Type = Inter & {
  number: number
  fn: () => void
}

const x: TypeScript.Jsx = {
  color: 'red',
  c: '#ddd'
}

const str: string = 'string'
const number = 10_000_000
const boolean = true
const arr = [1, 2, 3]
const obj: Type = { key: 'value', number, fn() {} }
const reg = /\d+/g
const allowFn = (a: number, b: TypeScript.Jsx2) => a + b

// function add

/** @type {import('eslint').Linter.Config[]} */

/**
 * Cancels the document load.
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Window)
 */

export function add(a: number, b): number {
  return a + b
}

for (let i = 0; i < 1000000; i++) {
  add(i, i)
}

JSON.stringify({})



window.setTimeout(() => {}, 1000)


setInterval(() => {}, 1000)


window.addEventListener('click', () => {
  fs.readFileSync('./demo.ts')
  const a = path.join(__dirname, 'demo.ts')
  child_process.exec('ts')
})

class ClassA {
  name: string
  value: number
  constructor(name: string, value: number) {
    this.name = name
    this.value = value
  }

  getName() {
    return this.name
  }
}

console.log(str, boolean, arr, obj, reg, allowFn, ClassA)
