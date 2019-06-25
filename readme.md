# Hooks To Others
Transform react hooks into `render props` and `high-order component` patterns.


## Installation
`yarn add hooks-to-others`


## Usage

### `hookToRenderProps`
```js
  import { hookToRenderProps } from 'hooks-to-others'

  const useCounter = (initial: number = 0) => {
    const [count, set] = React.useState(initial)
    return {
      count,
      set,
      inc: () => set(prev => prev + 1),
      dec: () => set(prev => prev - 1),
    }
  }

  const Counter = hookToRenderProps(useCounter)

  <Counter
    args={[3]}
  >
    {({ count, inc, dec }) => (
      <>
        {count}
        <button onClick={inc}>+1</button>
        <button onClick={dec}>-1</button>
      </>
    )}
  </Counter>

```

### `hookToHOC`
```js
import {  hookToHOC } from 'hooks-to-others'

const useCounter = (initial: number = 0) => {
  const [count, set] = React.useState(initial)
  return {
    count,
    set,
    inc: () => set(prev => prev + 1),
    dec: () => set(prev => prev - 1),
  }
}


const Counter = hookToHOC(
  useCounter,
  ({ returns: { inc, count, dec } }) => (
    <>
      {count}
      <button onClick={inc}>+1</button>
      <button onClick={dec}>-1</button>
    </>
  ),
)

<Counter args={[100]} />

```