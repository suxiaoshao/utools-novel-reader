import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Switch,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useSettingTheme } from '../../../../utils/store/setting.store';
import { Style } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import ThemeValueForm from './themeValueForm';
import { useThemeList } from '../../../../utils/hooks/data/useThemeList';

export const useSettingClasses = makeStyles((theme: Theme) =>
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
  const [theme, setTheme] = useSettingTheme();
  const classes = useSettingClasses();
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
          <Typography gutterBottom>是否跟随 utools 主题</Typography>
          <Switch
            color="primary"
            checked={!('name' in theme)}
            onChange={() => {
              if ('name' in theme) {
                setTheme({ dark: themeList[0], light: themeList[1] });
              } else {
                setTheme(themeList[0]);
              }
            }}
          />
          {!('name' in theme) ? (
            <>
              <Typography gutterBottom>明亮模式主题</Typography>
              <ThemeValueForm
                value={theme.light}
                onChange={(newValue) => {
                  theme.light = newValue;
                  setTheme(theme);
                }}
              />
              <Typography gutterBottom>暗黑模式主题</Typography>
              <ThemeValueForm
                value={theme.dark}
                onChange={(newValue) => {
                  theme.dark = newValue;
                  setTheme(theme);
                }}
              />
            </>
          ) : (
            <>
              <FormLabel>固定主题</FormLabel>
              <ThemeValueForm
                value={theme}
                onChange={(newValue) => {
                  setTheme(newValue);
                }}
              />
            </>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
}
