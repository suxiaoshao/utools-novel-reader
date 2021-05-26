import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import init from '../data/pkg';
import { writeToFile } from './utils/data/util';
import { configStore } from './utils/store/config.store';
import { TotalDataBuild, TotalDataProp } from './utils/data/totalData';
import { settingStore } from './utils/store/setting.store';
import { historyStore } from './utils/store/history.store';

utools.onPluginReady(() => {
  utools.onPluginEnter((params) => {
    if (params.code === 'bookshelf') {
      historyStore.replace({ name: '书架', pathname: '/bookshelf' });
    }
  });
  init().then(() => {
    const totalData = TotalDataBuild.getTotalData();
    totalData.addOnchangeFunc((data: TotalDataProp) => {
      configStore.setData(data.totalConfig);
      settingStore.setData(data.setting);
      writeToFile(new TextEncoder().encode(JSON.stringify(data)));
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
