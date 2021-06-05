import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip } from '@material-ui/core';
import { Add, PermDataSetting } from '@material-ui/icons';
import React from 'react';
import { useSettingClasses } from '../themeEdit/themeEdit';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { brown } from '@material-ui/core/colors';
import { useTotalConfigs } from '../../../../utils/store/config.store';
import ConfigChip from './configChip';
import { historyStore } from '../../../../utils/store/history.store';

const useClasses = makeStyles((theme) =>
  createStyles({
    green: {
      color: '#fff',
      backgroundColor: brown[600],
    },
    tag: {
      margin: theme.spacing(1),
    },
  }),
);

export default function ConfigCard(): JSX.Element {
  const setClasses = useSettingClasses();
  const classes = useClasses();
  const [allConfigs] = useTotalConfigs();
  return (
    <Card className={setClasses.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.green}>
            <PermDataSetting />
          </Avatar>
        }
        title={'小说源配置'}
        action={
          <Tooltip title={'添加配置'}>
            <IconButton
              onClick={() => {
                historyStore.push({ name: '添加新源', pathname: '/editConfig' });
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        {allConfigs.map((value) => (
          <ConfigChip className={classes.tag} config={value} key={value.mainPageUrl} />
        ))}
      </CardContent>
    </Card>
  );
}
