import { useAsyncFn } from 'react-use';
import React, { DependencyList } from 'react';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import { useSnackbar } from 'notistack';

/**
 * 包装了提醒信息的 useAsyncFn
 * @param fn 函数
 * @param successMessage 成功信息
 * @param deps 依赖
 * */
export function useAsyncFnWithNotify<T>(
  fn: () => Promise<T>,
  successMessage?: string,
  deps?: DependencyList,
): AsyncFnReturn<() => Promise<T>> {
  const [state, fetch] = useAsyncFn(fn, deps);
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    /**
     * 成功的时候发出信息
     * */
    if ('value' in state && successMessage !== undefined && !state.loading && !state.error) {
      enqueueSnackbar(successMessage, {
        variant: 'success',
      });
    }
    /**
     * 发生错误时发出信息
     * */
    if (state.error !== undefined && !state.loading) {
      enqueueSnackbar(state.error.message, {
        variant: 'error',
      });
    }
  }, [enqueueSnackbar, state, successMessage]);
  return [state, fetch];
}
