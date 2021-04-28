import { Reducer, useReducer } from 'react';

/**
 * 无任何参数返回值的函数
 * */
export interface NoneFunc {
  (): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 强制更新本组件
 * */
export function useForceUpdate(): NoneFunc {
  const [, forceUpdate] = useReducer<Reducer<number, string>>((x) => x + 1, 0);
  return () => {
    forceUpdate('');
  };
}
