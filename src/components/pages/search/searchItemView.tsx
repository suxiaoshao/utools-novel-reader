import React from 'react';
import { Avatar, Card, CardContent, CardHeader, Link, Typography } from '@material-ui/core';
import { SearchListItem } from '../../../utils/web/search';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useClasses = makeStyles((theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1),
      width: `calc(50% - ${theme.spacing(2)}px)`,
    },
  }),
);

export interface SearchItemProp {
  /**
   * 搜索结果
   * */
  searchItem: SearchListItem;
}

export default function SearchItemView(props: SearchItemProp): JSX.Element {
  const classes = useClasses();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={props.searchItem.image} />}
        title={props.searchItem.novelName}
        subheader={`${props.searchItem.label} · ${props.searchItem.authorName}`}
      />
      <CardContent>
        <Typography variant="body2" component="p" gutterBottom>
          {props.searchItem.desc}
        </Typography>
        <Typography color={'textSecondary'}>
          最后一章 : <Link> {props.searchItem.latestChapter.name}</Link>
        </Typography>
        <Typography color={'textSecondary'}>最后更新时间 : {props.searchItem.updateTime}</Typography>
      </CardContent>
    </Card>
  );
}
