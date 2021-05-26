import { Theme, Typography } from '@material-ui/core';
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FontStyleProp } from '../../../views/chapterPage';

export interface FontSizeTypoProp {
  fontSize: 1 | 2 | 3 | 4 | 5;
}

const useClasses = makeStyles<Theme, FontStyleProp>((theme) =>
  createStyles({
    font: {
      fontSize: (props) => {
        return theme.spacing(2 + props.fontSize / 5);
      },
    },
  }),
);

export default function FontSizeTypo(props: FontSizeTypoProp): JSX.Element {
  const classes = useClasses(props);
  return <Typography className={classes.font}>字号{props.fontSize}</Typography>;
}
