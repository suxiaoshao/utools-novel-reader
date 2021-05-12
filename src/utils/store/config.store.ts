import { Store } from './store';
import { TotalConfig } from '../web/config/totalConfig';

/**
 * 配置的基础设置
 * */
export class ConfigStore extends Store<TotalConfig[]> {
  constructor() {
    super([]);
  }
}

export const configStore = new ConfigStore();

export const useTotalConfigs = configStore.getDataFunc();
