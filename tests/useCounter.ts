import * as React from 'react'

const useCounter = (initial: number = 0) => {
  const [count, set] = React.useState(initial)
  return {
    count,
    set,
    inc: () => set(prev => prev + 1),
    dec: () => set(prev => prev - 1),
  }
}

export default useCounter
