import { Store } from './store';
import { TotalConfig } from '../web/config/totalConfig';
import { TotalDataBuild } from '../data/totalData';

/**
 * 配置的基础设置
 * */
export class ConfigStore extends Store<TotalConfig[]> {
  constructor() {
    super([]);
  }

  public selfUpdate(): void {
    const totalData = TotalDataBuild.getTotalData();
    this.setData(totalData.getAllConfig());
  }
}

export const configStore = new ConfigStore();

export const useTotalConfigs = configStore.getDataFunc();
