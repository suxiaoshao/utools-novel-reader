import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import init from '../data/pkg';
import { writeToFile } from './utils/data/util';
import { configStore } from './utils/store/config.store';
import { TotalDataBuild } from './utils/data/totalData';
import { settingStore } from './utils/store/setting.store';

utools.onPluginReady(() => {
  init().then(() => {
    const totalData = TotalDataBuild.getTotalData();
    totalData.addOnchangeFunc((buf: Uint8Array) => {
      writeToFile(buf);
      // 初始化配置
      configStore.setData(totalData.getAllConfig());
      settingStore.setData(totalData.getSetting());
      console.log(JSON.parse(new TextDecoder().decode(buf)));
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
