import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import useCounter from './useCounter'
import { hookToRenderProps, hookToHOC } from '../src'

afterEach(cleanup)

test('hookToRenderProps', () => {
  const Counter = hookToRenderProps(useCounter)
  const { getByText } = render(
    <Counter
      args={[3]}
    >
      {({ count, inc, dec }) => (
        <>
          <span>
            {`count: ${count}`}
          </span>
          <button onClick={inc}>+1</button>
          <button onClick={dec}>-1</button>
        </>
      )}
    </Counter>,
  )
  expect(getByText(/count/).textContent).toMatch('3')
  fireEvent.click(getByText(/\+1/))
  expect(getByText(/count/).textContent).toMatch('4')
  fireEvent.click(getByText(/-1/))
  expect(getByText(/count/).textContent).toMatch('3')
})

test('hookToHOC', () => {
  const Counter = hookToHOC(
    useCounter,
    ({ returns: { inc, count, dec } }) => (
      <>
        <span>
          {`count: ${count}`}
        </span>
        <button onClick={inc}>+1</button>
        <button onClick={dec}>-1</button>
      </>
    ),
  )
  const { getByText } = render(<Counter args={[3]} />)
  expect(getByText(/count/).textContent).toMatch('3')
  fireEvent.click(getByText(/\+1/))
  expect(getByText(/count/).textContent).toMatch('4')
  fireEvent.click(getByText(/-1/))
  expect(getByText(/count/).textContent).toMatch('3')
})
