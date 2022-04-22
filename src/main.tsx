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

/**
 * 插件进入时
 * */
utools.onPluginEnter((params) => {
  if (params.code === 'bookshelf') {
    historyStore.replace({ name: '书架', pathname: '/bookshelf' });
  }
});
/**
 * 插件退出时
 * */
utools.onPluginOut(() => {
  const totalData = TotalDataBuild.getTotalData();
  writeToFile(totalData.toData());
});
init().then(() => {
  const totalData = TotalDataBuild.getTotalData();
  writeToFile(totalData.toData());
  totalData.addOnchangeFunc((data: TotalDataProp) => {
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
