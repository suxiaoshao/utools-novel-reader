import React from 'react';
import { createStyles, makeStyles, Paper, Tab, Tabs } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';

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
  const myLocation = useLocation();
  const myHistory = useHistory();
  const style = useStyle();
  return (
    <div className={style.page}>
      <Paper className={style.tabs} square>
        <Tabs
          onChange={(event, value) => {
            myHistory.push(value);
          }}
          value={myLocation.pathname}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="搜索" value={'/'} />
          <Tab label="书架" value={'/bookshelf'} />
          <Tab label="读取文件" value={'/readFile'} />
        </Tabs>
      </Paper>
      <main className={`${style.main} ${props.classname}`}>{props.children}</main>
    </div>
  );
}
