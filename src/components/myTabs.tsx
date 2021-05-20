import React from 'react';
import { createStyles, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { historyStore, useActiveLocation } from '../utils/store/history.store';
import { getClassName } from '../utils/getClassName';

const useStyle = makeStyles(() =>
  createStyles({
    page: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    tabs: {
      flex: '0 0 auto',
    },
    main: {
      flex: '1 1 0',
    },
  }),
);

export default function MyTabs(props: { children?: React.ReactNode; classname?: string }): JSX.Element {
  const [myLocation] = useActiveLocation();
  const style = useStyle();
  return (
    <div className={style.page}>
      <Paper className={style.tabs} square>
        <Tabs
          onChange={(event, value: '/' | '/bookshelf' | '/readFile' | '/setting') => {
            let name: string;
            switch (value) {
              case '/':
                name = '搜索';
                break;
              case '/bookshelf':
                name = '书架';
                break;
              case '/readFile':
                name = '读取文件';
                break;
              case '/setting':
                name = '设置';
                break;
            }
            historyStore.replace({ pathname: value, name });
          }}
          value={myLocation.pathname}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="搜索" value={'/'} />
          <Tab label="书架" value={'/bookshelf'} />
          <Tab label="读取文件" value={'/readFile'} />
          <Tab label="设置" value={'/setting'} />
        </Tabs>
      </Paper>
      <main className={getClassName(style.main, props.classname)}>{props.children}</main>
    </div>
  );
}
