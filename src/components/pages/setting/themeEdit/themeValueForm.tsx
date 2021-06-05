import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeValue } from '../../../../utils/store/setting.store';
import ThemeButton, { ThemeEnv } from './themeButton';
import { useThemeList } from '../../../../utils/hooks/data/useThemeList';

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
  const themeList = useThemeList();
  return (
    <div className={classes.main}>
      {themeList.map((value) => (
        <ThemeEnv theme={value} key={value.name}>
          <ThemeButton
            onClick={() => {
              props.onChange(value);
            }}
            disabled={props.value.name === value.name}
          >
            {value.name}
          </ThemeButton>
        </ThemeEnv>
      ))}
    </div>
  );
}
