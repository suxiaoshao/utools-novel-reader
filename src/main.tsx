import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'fontsource-roboto';
import init from '../data/pkg';
import { checkData } from './utils/data/util';

utools.onPluginReady(() => {
  init().then(() => {
    checkData();
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
});
