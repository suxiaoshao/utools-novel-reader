import { Store } from './store';
import { TotalDataBuild } from '../data/totalData';

export type ThemeValue = 'dark' | 'light' | 'green' | 'yellow';

export type SettingTheme = ThemeValue | { light: ThemeValue; dark: ThemeValue };

export interface SettingConfig {
  theme: SettingTheme;
  fontSize: 1 | 2 | 3 | 4 | 5;
}

export class SettingStore extends Store<SettingConfig> {
  constructor() {
    super({ theme: { dark: 'dark', light: 'light' }, fontSize: 1 });
  }

  /**
   * 更新主题
   * */
  public updateTheme(theme: SettingTheme): void {
    const newSetting = { ...this.data, theme };
    const totalData = TotalDataBuild.getTotalData();
    totalData.updateSetting(newSetting);
  }

  public selfUpdate(): void {
    const totalData = TotalDataBuild.getTotalData();
    this.setData(totalData.getSetting());
  }
}

/**
 * 设置
 * */
export const settingStore = new SettingStore();
/**
 * 主题
 * */
export const useSettingTheme = settingStore.getComputeFunc(
  (setting) => setting.theme,
  (theme, preData) => ({
    ...preData,
    theme,
  }),
);
/**
 * 全部设置
 * */
export const useSetting = settingStore.getDataFunc();
/**
 * 获取 font-size
 * */
export const useFontSize = settingStore.getComputeFunc(
  (data) => data.fontSize,
  (newComputeData, preData) => preData,
);
