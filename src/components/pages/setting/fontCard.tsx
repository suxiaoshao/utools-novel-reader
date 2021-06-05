import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from '@material-ui/core';
import { ChromeReaderMode } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { FontSize, useFontSize } from '../../../utils/store/setting.store';
import FontSizeTypo from './fontSizeTypo';

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
  const [fontSize, setFortSize] = useFontSize();
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
      <CardContent>
        <FormControl component="fieldset" className={classes.form}>
          <Typography gutterBottom>阅读页面字体大小</Typography>
          <RadioGroup
            value={fontSize}
            onChange={(event, value) => {
              setFortSize(parseInt(value) as FontSize);
            }}
            row
          >
            {Array(10)
              .fill(1)
              .map((value, index) => (
                <FormControlLabel
                  key={index}
                  value={index + 1}
                  control={<Radio />}
                  label={<FontSizeTypo fontSize={(index + 1) as FontSize} />}
                />
              ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}
