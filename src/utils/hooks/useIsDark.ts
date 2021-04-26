import { createContext } from 'react';

export interface IsDark {
  /**
   * 是否是暗黑模式
   * */
  isDark: boolean;

  /**
   * 设施暗黑模式
   * */
  setIsDark(value: boolean): void;
}

export const IsDarkContext = createContext<IsDark>({
  isDark: false,
  setIsDark(value: boolean): void {
    console.log(value);
  },
});
