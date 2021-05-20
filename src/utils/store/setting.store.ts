import { Store } from './store';

export type ThemeValue = 'dark' | 'light' | 'green' | 'yellow';

export interface SettingConfig {
  theme: ThemeValue | { light: ThemeValue; dark: ThemeValue };
  fontSize: number;
}

export class SettingStore extends Store<SettingConfig> {
  constructor() {
    super({ theme: { dark: 'dark', light: 'light' }, fontSize: 0 });
  }
}

/**
 * 设置
 * */
export const settingStore = new SettingStore();
/**
 * 主题
 * */
export const useTheme = settingStore.getComputeFunc(
  (setting) => setting.theme,
  (theme, preData) => ({
    ...preData,
    theme,
  }),
);
