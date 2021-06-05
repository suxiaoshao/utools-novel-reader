import { Store } from './store';
import { TotalDataBuild } from '../data/totalData';
import { TypeBackground } from '@material-ui/core/styles/createPalette';

export interface ThemeValue {
  name: string;
  type: 'light' | 'dark';
  background: null | TypeBackground;
}

export type FontSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SettingTheme = ThemeValue | { light: ThemeValue; dark: ThemeValue };

export interface SettingConfig {
  theme: SettingTheme;
  fontSize: FontSize;
}

export class SettingStore extends Store<SettingConfig> {
  constructor() {
    super({
      theme: {
        dark: { type: 'dark', name: '暗黑', background: null },
        light: { type: 'light', name: '明亮', background: null },
      },
      fontSize: 1,
    });
  }

  /**
   * 更新主题
   * */
  public updateTheme(theme: SettingTheme): void {
    const newSetting = { ...this.data, theme };
    const totalData = TotalDataBuild.getTotalData();
    totalData.updateSetting(newSetting);
  }

  /**
   * 更新字体
   * */
  public updateFontSize(fontSize: FontSize): void {
    const newSetting = { ...this.data, fontSize };
    const totalData = TotalDataBuild.getTotalData();
    totalData.updateSetting(newSetting);
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
  (theme) => {
    settingStore.updateTheme(theme);
  },
);
/**
 * 获取 font-size
 * */
export const useFontSize = settingStore.getComputeFunc(
  (data) => data.fontSize,
  (fontSize) => {
    settingStore.updateFontSize(fontSize);
  },
);
