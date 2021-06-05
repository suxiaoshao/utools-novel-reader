import { createHashHistory, createLocation, Location, LocationDescriptorObject } from 'history';
import { Store } from './store';

const thisHistory = createHashHistory();

export interface MyLocation extends Location {
  name: string;
}

export interface MyLocationDescriptorObject extends LocationDescriptorObject {
  name: string;
}

export class HistoryStore extends Store<MyLocation[]> {
  public constructor() {
    const thisLocation = createLocation({ pathname: '/' });
    super([{ ...thisLocation, name: '搜索' }]);
  }

  /**
   * 跳转
   * */
  public push(path: MyLocationDescriptorObject): void {
    thisHistory.push(path);
    const thisLocation = createLocation(path);
    this.setData([...this.data, { ...thisLocation, name: path.name }]);
  }

  /**
   * 替换
   * */
  public replace(path: MyLocationDescriptorObject): void {
    thisHistory.replace(path);
    this.data.pop();
    const thisLocation = createLocation(path);
    this.setData([...this.data, { ...thisLocation, name: path.name }]);
  }

  /**
   * 返回首页
   * */
  public goHome(): void {
    thisHistory.push({ pathname: '/' });
    const thisLocation = createLocation({ pathname: '/' });
    this.setData([{ ...thisLocation, name: '搜索' }]);
  }

  /**
   * 返回某一页
   * */
  public goIndex(index: number): void {
    thisHistory.push(this.data[index]);
    const data = this.data.slice(0, index + 1);
    this.setData(data);
  }

  /**
   * 跟新最后一章名字
   * */
  public updateActiveName(name: string): void {
    this.data[this.data.length - 1].name = name;
    this.setData([...this.data]);
  }

  /**
   * 返回上一页
   * */
  public goBack(): void {
    this.goIndex(this.data.length - 2);
    console.log(this);
  }
}

export const historyStore = new HistoryStore();
/**
 * 当前数据
 * */
export const useActiveLocation = historyStore.getComputeFunc(
  (data) => data[data.length - 1],
  (newComputeData, manager) => {
    thisHistory.replace(newComputeData);
    manager.getData().pop();
    manager.setData([...manager.getData(), newComputeData]);
  },
);
export const useAllLocation = historyStore.getDataFunc();
