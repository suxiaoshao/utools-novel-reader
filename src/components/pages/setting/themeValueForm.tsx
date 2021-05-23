import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeValue } from '../../../utils/store/setting.store';
import ThemeButton, { ThemeEnv } from './themeButton';

const useClasses = makeStyles((theme) =>
  createStyles({
    main: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    button: {
      margin: theme.spacing(1),
    },
    light: {
      backgroundColor: '#fff',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    dark: {
      backgroundColor: '#424242',
      color: '#fff',
    },
    yellow: {
      backgroundColor: '#fafafa',
      color: 'rgba(0, 0, 0, 0.87)',
    },
    green: {
      backgroundColor: '#424242',
      color: '#fff',
    },
  }),
);

export interface ThemeFormProp {
  /**
   * 绑定的主题值
   * */
  value: ThemeValue;

  /**
   * 修改
   * */
  onChange(newValue: ThemeValue): void;
}

/**
 * 编辑 settingValue
 * */
export default function ThemeValueForm(props: ThemeFormProp): JSX.Element {
  const classes = useClasses();
  return (
    <div className={classes.main}>
      <ThemeEnv theme={'light'}>
        <ThemeButton
          disabled={props.value === 'light'}
          onClick={() => {
            props.onChange('light');
          }}
        >
          明亮
        </ThemeButton>
      </ThemeEnv>
      <ThemeEnv theme={'dark'}>
        <ThemeButton
          disabled={props.value === 'dark'}
          onClick={() => {
            props.onChange('dark');
          }}
        >
          暗黑
        </ThemeButton>
      </ThemeEnv>
      <ThemeEnv theme={'yellow'}>
        <ThemeButton
          onClick={() => {
            props.onChange('yellow');
          }}
          disabled={props.value === 'yellow'}
        >
          明黄
        </ThemeButton>
      </ThemeEnv>
      <ThemeEnv theme={'green'}>
        <ThemeButton
          onClick={() => {
            props.onChange('yellow');
          }}
          disabled={props.value === 'green'}
        >
          明绿
        </ThemeButton>
      </ThemeEnv>
    </div>
  );
}
