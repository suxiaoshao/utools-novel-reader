import React from 'react';
import { useQuery } from '../utils/hooks/useQuery';
import { defaultConfigs } from '../utils/web/config/defaultConfig';
import { useAsyncFnWithNotify } from '../utils/hooks/useAsyncFnWithNotify';
import { NovelInfo } from '../utils/web/novelInfo';
import { Avatar, Card, CardContent, CardHeader, Link, makeStyles, Typography } from '@material-ui/core';
import { Loading } from '../components/common/loading';
import { historyStore } from '../utils/store/history.store';
import MyBreadcrumbs from '../components/myBreadcrumbs';
import { createStyles } from '@material-ui/core/styles';

const useClasses = makeStyles((theme) =>
  createStyles({
    main: {
      margin: theme.spacing(1),
      marginTop: 0,
      maxHeight: `calc(100% - ${theme.spacing(1)}px)`,
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
  const mainPageUrl = useQuery('url');
  const novelId = useQuery('novelId');
  const activeConfig = React.useMemo(() => {
    return defaultConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl]);
  React.useEffect(() => {
    if (!(activeConfig && novelId)) {
      historyStore.goHome();
    }
  }, [activeConfig, novelId]);
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
    fn();
  }, [fn]);
  return (
    <MyBreadcrumbs>
      <Loading state={{ ...state, retry: fn }}>
        {state.value && (
          <Card className={classes.main}>
            <CardHeader
              avatar={<Avatar src={state.value.image} />}
              title={state.value.name}
              subheader={state.value.author}
            />
            <CardContent>
              <Typography variant="body2" component="p" gutterBottom>
                {state.value.desc}
              </Typography>
              <Typography color={'textSecondary'}>
                最后一章 : <Link> {state.value.latestChapter.name}</Link>
              </Typography>
              <Typography gutterBottom color={'textSecondary'}>
                最后更新时间 : {state.value.lastUpdateTime}
              </Typography>
              <div className={classes.directories}>
                {state.value.directories.map((value) => (
                  <Link className={classes.chapter} key={value.chapterId}>
                    {value.name}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </Loading>
    </MyBreadcrumbs>
  );
}
