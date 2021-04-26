import { UTools } from 'utools-helper/@types/utools';

declare global {
  interface Window {
    utools: UTools & {
      isDarkColors(): boolean;
    };
  }
}
declare global {
  type Utools = UTools & {
    isDarkColors(): boolean;
  };
}
