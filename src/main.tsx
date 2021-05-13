import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import init, { TotalData } from '../data/pkg';
import { getBuffer, writeToFile } from './utils/data/util';
import { configStore } from './utils/store/config.store';
import { totalData } from './utils/data/totalData';

utools.onPluginReady(() => {
  init().then(() => {
    totalData.data = TotalData.load(getBuffer());
    totalData.data.addOnchangeFunc((buf: Uint8Array) => {
      writeToFile(buf);
      console.log(JSON.parse(new TextDecoder().decode(buf)));
    });
    configStore.setData(totalData.data.getAllConfig());
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
});
