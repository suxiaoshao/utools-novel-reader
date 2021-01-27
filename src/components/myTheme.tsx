import React, { useMemo, useState } from 'react';
import { createMuiTheme, CssBaseline, MuiThemeProvider, Theme } from '@material-ui/core';

export function MyThemeProvider(props: { children: React.ReactNode }): JSX.Element {
  // 是否为暗黑主题
  const [dark] = useState<boolean>(window.utools?.isDarkColors() ?? true);
  //主题对象
  const themeObject = useMemo<Theme>(() => {
    return createMuiTheme({
      palette: dark
        ? {
            type: 'dark',
            primary: {
              main: '#90caf9',
              light: '#a6d4fa',
              dark: '#648dae',
            },
            secondary: {
              main: '#f48fb1',
              light: '#f6a5c0',
              dark: '#aa647b',
            },
          }
        : undefined,
    });
  }, [dark]);

  return (
    <MuiThemeProvider theme={themeObject}>
      <CssBaseline />
      <div className={dark ? 'my-dark' : 'my-light'}>{props.children}</div>
    </MuiThemeProvider>
  );
}
