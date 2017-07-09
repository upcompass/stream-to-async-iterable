export async function* toIterable<T>(
  readStream: NodeJS.ReadWriteStream
): AsyncIterable<T> {
  let streamEnded = false
  let generationEnded = false
  const records = new Array<T>()

  readStream.on('error', err => {
    if (!streamEnded) {
      streamEnded = true
    }
    if (err) {
      throw err
    }
  })

  readStream.on('data', data => {
    records.push(data)
  })

  readStream.on('end', () => {
    streamEnded = true
  })

  while (!generationEnded) {
    const value = await new Promise<T>(resolve =>
      setTimeout(() => resolve(records.shift()), 0)
    )
    if (value) {
      yield value
    }
    generationEnded = streamEnded && records.length === 0
  }
}

;(Symbol as any).asyncIterator =
  Symbol.asyncIterator || Symbol.for('Symbol.asyncIterator')
