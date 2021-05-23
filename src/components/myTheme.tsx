import React from 'react';
import { Button, createStyles, CssBaseline, MuiThemeProvider, Theme } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/dayjs';
import { SnackbarProvider } from 'notistack';
import { Notify } from './common/notify';
import { makeStyles } from '@material-ui/core/styles';
import { useThemeValue } from '../utils/hooks/useThemeValue';

dayjs.locale('zh-cn');

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 主题组件的 prop
 * */
interface MyThemeProp {
  /**
   * 子组件
   * */
  children: React.ReactNode;
}

interface StyleProp {
  /**
   * 是否是暗色系统
   * */
  isDark: boolean;
}

const useStyle = makeStyles<Theme, StyleProp>((theme) =>
  createStyles({
    '@global': {
      '::-webkit-scrollbar': {
        height: theme.spacing(1),
        width: theme.spacing(1),
        backgroundColor: '#00000000',
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: theme.spacing(0.5),
        border: 'none',
        backgroundColor: (props: StyleProp) => {
          return props.isDark ? '#ffffff50' : '#00000050';
        },
      },
      '::-webkit-scrollbar-track-piece': {
        backgroundColor: '#00000000',
      },
    },
  }),
);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 主题组件
 * */
export function MyThemeProvider(props: MyThemeProp): JSX.Element {
  /**
   * 主题对象
   * */
  const [themeObject, isDark] = useThemeValue();
  const nonstickRef = React.useRef<SnackbarProvider>(null);
  useStyle({ isDark });

  return (
    <MuiThemeProvider theme={themeObject}>
      <CssBaseline />
      {/* 时间组件 */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/* 消息条组件 */}
        <SnackbarProvider
          ref={nonstickRef}
          maxSnack={5}
          action={(key) => (
            <Button
              onClick={() => {
                nonstickRef.current?.closeSnackbar(key);
              }}
            >
              关闭
            </Button>
          )}
        >
          <Notify />
          {props.children}
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}
