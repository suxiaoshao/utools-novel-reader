import { UTools } from 'utools-helper/@types/utools';
import axios from 'axios';

declare global {
  interface Window {
    utools: UTools & {
      isDarkColors(): boolean;
    };
    axios: typeof axios;
  }
}
declare global {
  type Utools = UTools & {
    isDarkColors(): boolean;
  };
}
