import MyBreadcrumbs from '../components/myBreadcrumbs';
import React from 'react';
import '../utils/edit/init';
import Edit from '../components/common/editor/edit';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab';
import { Close, ExitToApp, Save } from '@material-ui/icons';
import { historyStore } from '../utils/store/history.store';
import { configStore } from '../utils/store/config.store';
import { notifySubject } from '../components/common/notify';

const defaultCode = `{
    "mainPageUrl": "",
    "name": "",
    "search": {
        "li": "",
        "novelId": "",
        "authorName": "",
        "latestChapterId": "",
        "updateTime": "",
        "image": "",
        "label": "",
        "desc": "",
        "encoding": ""
    },
    "novel": {
        "info": {
            "name": "",
            "author": "",
            "lastUpdateTime": "",
            "latestChapterId": "",
            "encoding": "",
            "image": "",
            "desc": ""
        },
        "directory": {
            "chapterId": "",
            "encoding": ""
        }
    },
    "url": {
        "search": "",
        "novelInfo": "",
        "directory": "",
        "chapter": "",
        "searchPlaceholder": "",
        "novelPlaceholder": "",
        "chapterPlaceholder": ""
    },
    "content": {
        "encoding": "",
        "chapterName": "",
        "novelName": "",
        "preChapterId": "",
        "nextChapterId": "",
        "content": "",
        "contentSplit": ""
    },
    "regex": {
        "novel": "",
        "novelIdPlaceholder": "",
        "chapterIdPlaceholder": "",
        "chapter": ""
    }
}`;
const useClasses = makeStyles((theme) =>
  createStyles({
    edit: {
      flex: '1 1 0',
    },
    page: {
      display: 'flex',
      flexDirection: 'column',
    },
    action: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

/**
 * 编辑源配置
 * */
export default function EditConfig(): JSX.Element {
  const classes = useClasses();
  const [code, setCode] = React.useState(defaultCode);
  const [open, setOpen] = React.useState(false);
  return (
    <MyBreadcrumbs classname={classes.page}>
      <Edit onChangeCode={setCode} className={classes.edit} code={code} />
      <SpeedDial
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        icon={<SpeedDialIcon />}
        className={classes.action}
        ariaLabel={'打开'}
        open={open}
      >
        <SpeedDialAction
          onClick={() => {
            const message = configStore.addConfig(code);
            if (message) {
              notifySubject.next({
                message,
                options: {
                  variant: 'error',
                },
              });
            } else {
              historyStore.goBack();
            }
          }}
          icon={<Save />}
          tooltipTitle={'保存'}
        />
        <SpeedDialAction
          icon={<Close />}
          tooltipTitle={'取消'}
          onClick={() => {
            historyStore.goBack();
          }}
        />
        <SpeedDialAction
          onClick={() => {
            utools.shellOpenExternal('https://yuanliao.info/d/1392-0-3-1-utools/176');
          }}
          icon={<ExitToApp />}
          tooltipTitle={'查看默认源配置'}
        />
      </SpeedDial>
    </MyBreadcrumbs>
  );
}
