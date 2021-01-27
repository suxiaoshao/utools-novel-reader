/// <reference types="react-scripts" />

import { UTools } from 'utools-helper/@types/utools';
import axios from 'axios';
import * as iconv from 'iconv-lite';

declare global {
  interface Window {
    utools: UTools & {
      isDarkColors(): boolean;
    };
    axios: typeof axios;
    iconv: typeof iconv;
  }
}
declare global {
  type Utools = UTools & {
    isDarkColors(): boolean;
  };
}
