import React from 'react';
import { historyStore } from '../utils/store/history.store';
import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { Loading } from '../components/common/loading';
import MyBreadcrumbs from '../components/myBreadcrumbs';
import { FontSize, useFontSize } from '../utils/store/setting.store';
import { useChapterRouter } from '../utils/hooks/page/useChapterRouter';
import { useChapterData } from '../utils/hooks/page/useChapterData';

export interface FontStyleProp {
  fontSize: FontSize;
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
        return theme.spacing(1.5 + props.fontSize / 10);
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
   * 路由数据
   * */
  const { activeConfig, novelId, chapterId } = useChapterRouter();
  const [fontSize] = useFontSize();
  const classes = useClasses({ fontSize });
  /**
   * 章节数据
   * */
  const [state, fn] = useChapterData(activeConfig, novelId, chapterId);
  /**
   * 跳转章节
   * */
  const pushToChapter = React.useCallback(
    (chapterId: string) => {
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
  /**
   * 左右翻页
   * */
  React.useEffect(() => {
    const hand = (ev: KeyboardEvent) => {
      if (novelId && state.value) {
        switch (ev.key) {
          case 'ArrowRight':
            if (state.value.nextChapterId) {
              pushToChapter(state.value.nextChapterId);
            }
            break;
          case 'ArrowLeft':
            if (state.value.preChapterId) {
              pushToChapter(state.value.preChapterId);
            }
            break;
          case 'Enter':
            pushNovel();
            break;
        }
      }
    };
    document.addEventListener('keydown', hand);
    return () => {
      document.removeEventListener('keydown', hand);
    };
  }, [classes.main, novelId, pushNovel, pushToChapter, state.value]);
  /**
   * 上下章翻页
   * */
  const action = React.useMemo(() => {
    return (
      state.value && (
        <div className={classes.actionFather}>
          <div className={classes.action}>
            {state.value.preChapterId && (
              <Button
                onClick={() => {
                  pushToChapter(state.value?.preChapterId ?? '');
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
                  pushToChapter(state.value?.nextChapterId ?? '');
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
