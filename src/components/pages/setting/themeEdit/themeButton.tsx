import React from 'react';
import { ThemeValue } from '../../../../utils/store/setting.store';
import { ButtonBase, ButtonProps, MuiThemeProvider } from '@material-ui/core';
import { getThemeByThemeValue } from '../../../../utils/hooks/useThemeValue';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { getClassName } from '../../../../utils/getClassName';

export interface ThemeEnvProp {
  theme: ThemeValue;
  children: React.ReactNode;
}

export function ThemeEnv(props: ThemeEnvProp): JSX.Element {
  const [theme] = getThemeByThemeValue(props.theme);
  return <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;
}

const useClasses = makeStyles((theme) => {
  return createStyles({
    buttonBase: {
      margin: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      width: theme.spacing(12),
      height: theme.spacing(8),
      boxShadow: theme.shadows[2],
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    disable: {
      boxShadow: theme.shadows[0],
      cursor: 'not-allowed !important',
      pointerEvents: 'none',
      color: theme.palette.text.disabled,
    },
  });
});

export default function ThemeButton(props: ButtonProps): JSX.Element {
  const classes = useClasses();
  return (
    <ButtonBase classes={{ disabled: classes.disable }} className={getClassName(classes.buttonBase)} {...props}>
      {props.children}
    </ButtonBase>
  );
}
