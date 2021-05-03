import { useEffect, useMemo, useState } from 'react';

export interface ListenFuncList<T> {
  func: (newData: T) => void;
  code: symbol;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 一个数据仓库
 * */
export class Store<Data> {
  /**
   * 保存的数据
   * */
  protected data: Data;
  /**
   * 监听列表
   * */
  private listenFuncList: ListenFuncList<Data>[];

  constructor(initData: Data) {
    this.data = initData;
    this.listenFuncList = [];
  }

  /**
   * 设置数据
   * */
  public setData(newData: Data): void {
    this.data = newData;
    this.notify();
  }

  /**
   * 获取数据
   * */
  public getData(): Data {
    return this.data;
  }

  /**
   * 通知所有监听过这个数据的函数
   * */
  protected notify(): void {
    this.listenFuncList.forEach((value) => {
      value.func(this.data);
    });
  }

  /**
   * 添加监听函数
   * */
  public addListen(func: (newValue: Data) => void): symbol {
    const code = Symbol();
    this.listenFuncList.push({ func, code });
    return code;
  }

  /**
   * 删除监听函数
   * */
  public deleteListen(code: symbol): void {
    this.listenFuncList = this.listenFuncList.filter((value) => value.code !== code);
  }

  /**
   * 获取一个 hooks 函数用来设置和访问数据
   * */
  public getDataFunc(): () => [Data, (newData: Data) => void] {
    return this.getComputeFunc<Data>(
      (data) => data,
      (newComputeData) => newComputeData,
    );
  }

  /**
   * 获取计算属性,和设置
   * */
  public getComputeFunc<ComData>(
    computeFunc: (data: Data) => ComData,
    reduceFunc: (newComputeData: ComData, preData: Data) => Data,
  ): () => [ComData, (newComputeData: ComData) => void] {
    return (): [ComData, (newComputeData: ComData) => void] => {
      /**
       * 基础数据
       * */
      const [baseValue, setBaseValue] = useState<Data>(this.getData());
      /**
       * 绑定监听
       * */
      useEffect(() => {
        const flag = this.addListen((newData) => {
          setBaseValue(newData);
        });
        return () => {
          this.deleteListen(flag);
        };
      }, []);
      /**
       * 计算真实数据
       * */
      const realValue = useMemo<ComData>(() => {
        return computeFunc(baseValue);
      }, [baseValue]);
      return [
        realValue,
        (newData) => {
          this.setData(reduceFunc(newData, baseValue));
        },
      ];
    };
  }
}
