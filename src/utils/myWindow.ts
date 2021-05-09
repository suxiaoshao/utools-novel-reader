import { UTools } from 'utools-helper/@types/utools';

declare global {
  interface Window {
    utools: UTools;
  }
}
declare global {
  type Utools = UTools;
}
