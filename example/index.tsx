import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { hookToRenderProps, hookToHOC } from '../src'
import useCounter from '../tests/useCounter'

const Counter = hookToRenderProps(useCounter)

const Counter2 = hookToHOC(
  useCounter,
  ({ returns: { inc, count, dec } }) => (
    <>
      {count}
      <button onClick={inc}>+1</button>
      <button onClick={dec}>-1</button>
    </>
  ),
)

ReactDOM.render(
  <>
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
    <Counter2 args={[100]} />
  </>,
  document.getElementById('app'),
)
