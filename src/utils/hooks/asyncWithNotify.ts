import { notifySubject } from '../../components/common/notify';

export interface AsyncFunc<T> {
  (): Promise<T>;
}

/**
 * 响应函数并提示用户情况
 * @param func 执行的函数
 * @param message 成功是发送的提示,为空说明不用执行
 * */
export function asyncWithNotify<T>(func: AsyncFunc<T>, message?: string): Promise<T> {
  return func()
    .then((value) => {
      if (message !== undefined) {
        notifySubject.next({
          message,
          options: {
            variant: 'success',
          },
        });
      }
      return value;
    })
    .catch((err: Error) => {
      notifySubject.next({
        message: err.message,
        options: {
          variant: 'error',
        },
      });
      throw err;
    });
}
