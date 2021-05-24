import React from 'react';
import { Avatar, Card, CardHeader, Theme } from '@material-ui/core';
import { ChromeReaderMode } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const useClasses = makeStyles((theme: Theme) =>
  createStyles({
    green: {
      color: '#fff',
      backgroundColor: deepPurple[600],
    },
    card: {
      margin: theme.spacing(2),
    },
    form: {
      width: '100%',
    },
  }),
);

export default function FontCard(): JSX.Element {
  const classes = useClasses();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.green}>
            <ChromeReaderMode />
          </Avatar>
        }
        title={'阅读设置'}
      />
    </Card>
  );
}
