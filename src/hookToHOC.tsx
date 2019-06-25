import * as React from 'react'
import { ArgumentTypes } from './hookToRenderProps'

export interface InjectedProps<T extends (...args: any) => any> {
  returns: ReturnType<T>
}

function hookToHOC<
  T extends(...args: any[]) => any,
  BaseProps extends InjectedProps<T>
>(hook: T, BaseComponent: React.ComponentType<BaseProps>) {
  type HOCProps = Omit<BaseProps, keyof InjectedProps<T>> & {
    args?: ArgumentTypes<T>
  }
  function HookToHOC(props: HOCProps) {
    const { args = [], ...others } = props
    //  may return any type of value from hook
    const returns = hook(...args)
    return (
      <BaseComponent
        {...others as BaseProps}
        returns={returns}
      />
    )
  }
  HookToHOC.displayName = `hookToHOC(${BaseComponent.displayName || 'Component'})`
  return HookToHOC
}

export default hookToHOC
