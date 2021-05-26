import React from 'react';
import { useQuery } from '../utils/hooks/useQuery';
import { useActiveConfig } from '../utils/hooks/data/useActiveConfig';
import { historyStore } from '../utils/store/history.store';
import { useAsyncFnWithNotify } from '../utils/hooks/async/useAsyncFnWithNotify';
import { Content } from '../utils/web/content';
import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { Loading } from '../components/common/loading';
import MyBreadcrumbs from '../components/myBreadcrumbs';
import { TotalDataBuild } from '../utils/data/totalData';
import { Chapter } from '../utils/web/novelInfo';
import { useFontSize } from '../utils/store/setting.store';

export interface FontStyleProp {
  fontSize: 1 | 2 | 3 | 4 | 5;
}

const useClasses = makeStyles<Theme, FontStyleProp>((theme) =>
  createStyles({
    main: {
      padding: theme.spacing(1),
      overflow: 'auto',
    },
    p: {
      textIndent: '2em',
      fontSize: (props) => {
        return theme.spacing(2 + props.fontSize / 5);
      },
    },
    center: {
      textAlign: 'center',
    },
    actionFather: {
      display: 'flex',
      justifyContent: 'center',
    },
    action: {
      minWidth: '50%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    page: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function ChapterPage(): JSX.Element {
  /**
   * 小说id
   * */
  const novelId = useQuery('novelId');
  /**
   * 配置
   * */
  const activeConfig = useActiveConfig();
  /**
   * 章节id
   * */
  const chapterId = useQuery('chapterId');
  const [fontSize] = useFontSize();
  const classes = useClasses({ fontSize });
  /**
   * 路由无效跳转首页
   * */
  React.useEffect(() => {
    if (!(activeConfig && novelId && chapterId)) {
      historyStore.goHome();
    }
  }, [activeConfig, chapterId, novelId]);
  /**
   * 获取数据
   * */
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      if (activeConfig && novelId && chapterId) {
        const novel = new Content(activeConfig);
        const date = await novel.getContent(novelId, chapterId);
        historyStore.updateActiveName(date.chapterName);
        return date;
      } else {
        throw new Error('参数错误');
      }
    },
    undefined,
    [activeConfig?.mainPageUrl, novelId, chapterId],
  );
  React.useEffect(() => {
    fn().then();
  }, [fn]);
  /**
   * 更新
   * */
  React.useEffect(() => {
    if (state.value && novelId && activeConfig?.mainPageUrl && chapterId) {
      const totalData = TotalDataBuild.getTotalData();
      const chapter: Chapter = { chapterId: chapterId, name: state.value.chapterName };
      totalData.updateRecord(chapter, novelId, activeConfig?.mainPageUrl);
    }
  }, [activeConfig?.mainPageUrl, chapterId, novelId, state.value]);
  /**
   * 跳转章节
   * */
  const pushToChapter = React.useCallback(
    (chapterId) => {
      historyStore.replace({
        search: `?novelId=${novelId}&url=${activeConfig?.mainPageUrl}&chapterId=${chapterId}`,
        name: `${state.value?.chapterName}的章节`,
      });
    },
    [novelId, activeConfig?.mainPageUrl, state.value?.chapterName],
  );
  /**
   * 跳转目录
   * */
  const pushNovel = React.useCallback(() => {
    historyStore.push({
      pathname: '/novel',
      search: `?novelId=${novelId}&url=${activeConfig?.mainPageUrl}`,
      name: state.value?.novelName ?? '',
    });
  }, [activeConfig?.mainPageUrl, novelId, state.value?.novelName]);
  const action = React.useMemo(() => {
    return (
      state.value && (
        <div className={classes.actionFather}>
          <div className={classes.action}>
            {state.value.preChapterId && (
              <Button
                onClick={() => {
                  pushToChapter(state.value?.preChapterId);
                }}
                color={'primary'}
              >
                上一章
              </Button>
            )}
            <Button onClick={pushNovel} color={'primary'}>
              《{state.value.novelName}》目录
            </Button>
            {state.value.nextChapterId && (
              <Button
                onClick={() => {
                  pushToChapter(state.value?.nextChapterId);
                }}
                color={'primary'}
              >
                下一章
              </Button>
            )}
          </div>
        </div>
      )
    );
  }, [classes.action, classes.actionFather, pushNovel, pushToChapter, state.value]);
  return (
    <MyBreadcrumbs classname={classes.main} pageClassName={classes.page}>
      <Loading state={{ ...state, retry: fn }}>
        {state.value && (
          <>
            <Typography variant={'h5'} className={classes.center}>
              {state.value.chapterName}
            </Typography>
            {action}
            {state.value.contentList.map((value) => (
              <Typography className={classes.p} paragraph variant={'body1'} component={'p'} key={value}>
                {value}
              </Typography>
            ))}
            {action}
          </>
        )}
      </Loading>
    </MyBreadcrumbs>
  );
}
