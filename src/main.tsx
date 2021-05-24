import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import init from '../data/pkg';
import { writeToFile } from './utils/data/util';
import { configStore } from './utils/store/config.store';
import { TotalDataBuild } from './utils/data/totalData';
import { SettingConfig, settingStore } from './utils/store/setting.store';
import { TotalConfig } from './utils/web/config/totalConfig';

utools.onPluginReady(() => {
  init().then(() => {
    const totalData = TotalDataBuild.getTotalData();
    totalData.addOnchangeFunc((buf: Uint8Array, setting: SettingConfig, configs: TotalConfig[]) => {
      configStore.setData(configs);
      settingStore.setData(setting);
      writeToFile(buf);
    });
    // 初始化配置
    configStore.setData(totalData.getAllConfig());
    settingStore.setData(totalData.getSetting());
    console.log(configStore, settingStore);
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
});
