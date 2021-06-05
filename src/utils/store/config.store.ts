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

  /**
   * 根据 mainPageUrl 删除配置
   * */
  public deleteByMainPageUrl(mainPageUrl: string): boolean {
    const totalData = TotalDataBuild.getTotalData();
    return totalData.deleteConfig(mainPageUrl);
  }
  /**
   * 添加配置
   * **/
  public addConfig(code: string): string | undefined {
    const totalData = TotalDataBuild.getTotalData();
    return totalData.addConfig(code);
  }
}

export const configStore = new ConfigStore();

export const useTotalConfigs = configStore.getDataFunc();
