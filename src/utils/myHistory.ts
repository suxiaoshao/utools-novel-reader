import { createHashHistory, LocationDescriptor } from 'history';

const thisHistory = createHashHistory();

export class MyHistory {
  histories: LocationDescriptor[];

  public constructor() {
    this.histories = ['/'];
  }

  public push(path: LocationDescriptor): void {
    thisHistory.push(path);
    this.histories.push(path);
  }

  public replace(path: LocationDescriptor): void {
    thisHistory.replace(path);
    this.histories.pop();
    this.histories.push(path);
  }

  public goHome(): void {
    thisHistory.push('/');
    this.histories = ['/'];
  }
}

export const myHistory = new MyHistory();
