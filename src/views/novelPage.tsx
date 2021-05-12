import React from 'react';
import { useQuery } from '../utils/hooks/useQuery';
import { useAsyncFnWithNotify } from '../utils/hooks/useAsyncFnWithNotify';
import { NovelInfo } from '../utils/web/novelInfo';
import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { Loading } from '../components/common/loading';
import { historyStore } from '../utils/store/history.store';
import MyBreadcrumbs from '../components/myBreadcrumbs';
import { createStyles } from '@material-ui/core/styles';
import { useActiveConfig } from '../utils/hooks/useActiveConfig';
import ChapterLink from '../components/common/chapterLink';
import { Star, StarBorder } from '@material-ui/icons';
import { totalData } from '../utils/data/totalData';

const useClasses = makeStyles((theme) =>
  createStyles({
    main: {
      margin: theme.spacing(1),
      marginTop: 0,
      height: `calc(100% - ${theme.spacing(1)}px)`,
      overflow: 'auto',
    },
    directories: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
    chapter: {
      width: '33%',
    },
  }),
);

export default function NovelPage(): JSX.Element {
  const classes = useClasses();
  /**
   * 小说 id
   * */
  const novelId = useQuery('novelId');
  /**
   * 配置
   * */
  const activeConfig = useActiveConfig();
  React.useEffect(() => {
    if (!(activeConfig && novelId)) {
      historyStore.goHome();
    }
  }, [activeConfig, novelId]);
  /**
   * 是否收藏
   * */
  const isStar = React.useMemo(() => {
    return totalData?.data?.checkExists(novelId ?? '', activeConfig?.mainPageUrl ?? '') ?? false;
  }, [activeConfig?.mainPageUrl, novelId]);
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      if (activeConfig && novelId) {
        const novel = new NovelInfo(activeConfig);
        return await novel.getDirectoryAndInfo(novelId);
      } else {
        throw new Error('参数错误');
      }
    },
    undefined,
    [activeConfig, novelId],
  );
  React.useEffect(() => {
    fn().then();
  }, [fn]);
  return (
    <MyBreadcrumbs>
      <Loading state={{ ...state, retry: fn }}>
        {state.value && novelId && activeConfig && (
          <Card className={classes.main}>
            <CardHeader
              avatar={<Avatar src={state.value.image} />}
              title={state.value.name}
              subheader={state.value.author}
              action={
                isStar ? (
                  <Tooltip title={'取消收藏'}>
                    <IconButton>
                      <Star />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title={'收藏'}>
                    <IconButton>
                      <StarBorder />
                    </IconButton>
                  </Tooltip>
                )
              }
            />
            <CardContent>
              <Typography variant="body2" component="p" gutterBottom>
                {state.value.desc}
              </Typography>
              <Typography color={'textSecondary'}>
                最后一章 :{' '}
                <ChapterLink chapter={state.value.latestChapter} novelId={novelId} url={activeConfig.mainPageUrl} />
              </Typography>
              <Typography gutterBottom color={'textSecondary'}>
                最后更新时间 : {state.value.lastUpdateTime}
              </Typography>
              <div className={classes.directories}>
                {state.value.directories.map((value) => (
                  <ChapterLink
                    className={classes.chapter}
                    chapter={value}
                    url={activeConfig.mainPageUrl}
                    key={value.chapterId}
                    novelId={novelId}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </Loading>
    </MyBreadcrumbs>
  );
}
