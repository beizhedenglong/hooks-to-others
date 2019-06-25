export type ArgumentTypes<F extends (...args: any) => any> =
  F extends (...args: infer A) => any ? A : never;


export interface HookValueProps<T extends (...args: any[]) => any> {
  children: (args: ReturnType<T>) => any,
  args?:ArgumentTypes<T>
}

export default function hookToRenderProps<T extends(...args: any[]) => any>(hook: T) {
  const HookValue
  : React.ComponentType<HookValueProps<T>> = ({ children, args = [] }) => {
    const res = hook(...args)
    if (typeof children === 'function') {
      return children(res)
    }
    return children === undefined ? null : children
  }
  return HookValue
}
