# stream-to-async-iterable
Converts a stream to an `AsyncIterable<T>`

## Usage
``` typescript
import { toIterable } from 'stream-to-async-iterable'

const asyncIterable = toIterable<object>(stream)
  
for await (const item of asyncItereable) {
  console.log(item)
}
```
