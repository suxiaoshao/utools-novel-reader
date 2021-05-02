import React from 'react';
import { useQuery } from '../utils/hooks/useQuery';
import { defaultConfigs } from '../utils/web/config/defaultConfig';
import { useAsyncFnWithNotify } from '../utils/hooks/useAsyncFnWithNotify';
import { NovelInfo } from '../utils/web/novelInfo';
import { Breadcrumbs, Card, CardHeader, Link, Typography } from '@material-ui/core';
import { Loading } from '../components/common/loading';
import { myHistory } from '../utils/myHistory';

export default function NovelPage(): JSX.Element {
  const mainPageUrl = useQuery('url');
  const novelId = useQuery('novelId');
  const activeConfig = React.useMemo(() => {
    return defaultConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl]);
  React.useEffect(() => {
    if (!(activeConfig && novelId)) {
      myHistory.goHome();
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
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
      <Loading state={{ ...state, retry: fn }}>
        {state.value && (
          <Card>
            <CardHeader title={state.value.name} subheader={state.value.author} />
          </Card>
        )}
      </Loading>
    </div>
  );
}
