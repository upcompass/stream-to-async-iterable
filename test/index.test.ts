/// <reference types="jest" />

import fs from 'fs'

import csv from 'csv-parser'

import ndjson from 'ndjson'

import { toIterable } from '../src/index'

async function toArray<T>(asyncItereable: AsyncIterable<T>) {
  const array = new Array<T>()
  for await (const item of asyncItereable) {
    array.push(item)
  }
  return array
}

test('toIterable test', async () => {
  const expected = 100
  const stream = fs.createReadStream(`${__dirname}/some-file.csv`).pipe(csv()) // .pipe(ndjson.serialize()).pipe(ndjson.parse())
  const iterable = toIterable<object>(stream)
  expect((await toArray(iterable)).length).toBe(expected)
})
