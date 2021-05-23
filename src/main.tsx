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
    totalData.addOnchangeFunc((buf: Uint8Array) => {
      writeToFile(buf);
      const data = JSON.parse(new TextDecoder().decode(buf)) as { totalConfig: TotalConfig[]; setting: SettingConfig };
      console.log(data);
      // 初始化配置
      configStore.setData(data.totalConfig);
      settingStore.setData(data.setting);
    });
    // 初始化配置
    configStore.setData(totalData.getAllConfig());
    settingStore.setData(totalData.getSetting());
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
});
