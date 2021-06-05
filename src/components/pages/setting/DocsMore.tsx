import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Comment, Description, GitHub, NearMe, Person } from '@material-ui/icons';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { useSettingClasses } from './themeEdit/themeEdit';

const useClasses = makeStyles(() =>
  createStyles({
    green: {
      color: '#fff',
      backgroundColor: blueGrey[600],
    },
  }),
);

export default function DocsMore(): JSX.Element {
  const setClasses = useSettingClasses();
  const classes = useClasses();
  return (
    <Card className={setClasses.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.green}>
            <Description />
          </Avatar>
        }
        title={'关于'}
      />
      <List>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary={'作者'} secondary={'sushao'} />
          <ListItemSecondaryAction>
            <Tooltip title={'打开作者 github'}>
              <IconButton
                onClick={() => {
                  utools.shellOpenExternal('https://github.com/suxiaoshao');
                }}
              >
                <NearMe />
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary={'github'} secondary={'https://github.com/suxiaoshao/utools-novel-reader'} />
          <Tooltip title={'打开插件 github'}>
            <IconButton
              onClick={() => {
                utools.shellOpenExternal('https://github.com/suxiaoshao/utools-novel-reader');
              }}
            >
              <NearMe />
            </IconButton>
          </Tooltip>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Comment />
          </ListItemIcon>
          <ListItemText primary={'交流地址'} secondary={'https://yuanliao.info/d/1392'} />
          <Tooltip title={'打开插件交流贴'}>
            <IconButton
              onClick={() => {
                utools.shellOpenExternal('https://yuanliao.info/d/1392');
              }}
            >
              <NearMe />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </Card>
  );
}
