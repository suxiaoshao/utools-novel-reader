import { Avatar, Card, CardContent, CardHeader, FormControl, FormLabel, Switch, Theme } from '@material-ui/core';
import React from 'react';
import { settingStore, useSettingTheme } from '../../../utils/store/setting.store';
import { Style } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import ThemeValueForm from './themeValueForm';
import { useThemeList } from '../../../utils/hooks/data/useThemeList';

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    green: {
      color: '#fff',
      backgroundColor: orange[800],
    },
    card: {
      margin: theme.spacing(2),
    },
    form: {
      width: '100%',
    },
  }),
);

export default function ThemeEdit(): JSX.Element {
  const [theme] = useSettingTheme();
  const classes = useClasses();
  const themeList = useThemeList();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.green}>
            <Style />
          </Avatar>
        }
        title={'主题设置'}
      />
      <CardContent>
        <FormControl component="fieldset" className={classes.form}>
          <FormLabel>是否跟随 utools 主题</FormLabel>
          <Switch
            color="primary"
            checked={!('name' in theme)}
            onChange={() => {
              if ('name' in theme) {
                settingStore.updateTheme({ dark: themeList[0], light: themeList[1] });
              } else {
                settingStore.updateTheme(themeList[0]);
              }
            }}
          />
          {!('name' in theme) ? (
            <>
              <FormLabel>明亮模式主题</FormLabel>
              <ThemeValueForm
                value={theme.light}
                onChange={(newValue) => {
                  theme.light = newValue;
                  settingStore.updateTheme(theme);
                }}
              />
              <FormLabel>暗黑模式主题</FormLabel>
              <ThemeValueForm
                value={theme.dark}
                onChange={(newValue) => {
                  theme.dark = newValue;
                  settingStore.updateTheme(theme);
                }}
              />
            </>
          ) : (
            <>
              <FormLabel>固定主题</FormLabel>
              <ThemeValueForm
                value={theme}
                onChange={(newValue) => {
                  settingStore.updateTheme(newValue);
                }}
              />
            </>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
}
