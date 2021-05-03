import React from 'react';
import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@material-ui/core';
import { SearchListItem } from '../../../utils/web/search';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';
import { TotalConfig } from '../../../utils/web/config/totalConfig';
import { historyStore } from '../../../utils/store/history.store';
import ChapterLink from '../../common/chapterLink';

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
  /**
   * 配置
   * */
  activeConfig: TotalConfig;
}

export default function SearchItemView(props: SearchItemProp): JSX.Element {
  const classes = useClasses();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={props.searchItem.image} />}
        title={props.searchItem.novelName}
        subheader={`${props.searchItem.label} · ${props.searchItem.authorName}`}
        action={
          <Tooltip title={'前往小说页面'}>
            <IconButton
              onClick={() => {
                historyStore.push({
                  pathname: '/novel',
                  search: `novelId=${props.searchItem.novelId}&url=${props.activeConfig.mainPageUrl}`,
                  name: props.searchItem.novelName,
                });
              }}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        }
      />
      <CardContent>
        <Typography variant="body2" component="p" gutterBottom>
          {props.searchItem.desc}
        </Typography>
        <Typography color={'textSecondary'}>
          最后一章 :{' '}
          <ChapterLink
            chapter={props.searchItem.latestChapter}
            novelId={props.searchItem.novelId}
            url={props.activeConfig.mainPageUrl}
          />
        </Typography>
        <Typography color={'textSecondary'}>最后更新时间 : {props.searchItem.updateTime}</Typography>
      </CardContent>
    </Card>
  );
}
