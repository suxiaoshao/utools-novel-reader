import React from 'react';
import { OptionsObject, SnackbarMessage, useSnackbar } from 'notistack';
import { Subject } from 'rxjs';

/**
 * 提示信息接口
 * */
export interface NotifyInterface {
  message: SnackbarMessage;
  options: OptionsObject;
}

/**
 * 提示信息触发者
 * */
export const notifySubject = new Subject<NotifyInterface>();

/**
 * 提示信息组件
 * */
export function Notify(): JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  React.useEffect(() => {
    /**
     * 绑定观察者
     * */
    const func = notifySubject.subscribe({
      next(value) {
        enqueueSnackbar(value.message, value.options);
      },
    });
    return () => {
      /**
       * 注销观察者
       * */
      func.unsubscribe();
    };
  }, [enqueueSnackbar]);
  return <></>;
}
