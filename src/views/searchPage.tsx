import React from 'react';
import MyTabs from '../components/myTabs';
import { Search } from '../utils/web/search';
import SearchInput from '../components/pages/search/searchInput';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../utils/hooks/async/useAsyncFnWithNotify';
import { Loading } from '../components/common/loading';
import SearchItemView from '../components/pages/search/searchItemView';
import { useQuery } from '../utils/hooks/useQuery';
import { historyStore } from '../utils/store/history.store';
import { useTotalConfigs } from '../utils/store/config.store';

const useClasses = makeStyles(() =>
  createStyles({
    all: {
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      flex: '1 1 0',
      overflow: 'auto',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'start',
    },
  }),
);

/**
 * 搜索页
 * */
export default function SearchPage(): JSX.Element {
  const [totalConfigs] = useTotalConfigs();
  /**
   * 搜索关键词
   * */
  const searchName = useQuery('searchName') ?? '';
  /**
   * 主页url
   * */
  const mainPageUrl = useQuery('mainPageUrl') ?? totalConfigs[0]?.mainPageUrl ?? '';
  /**
   * 活跃配置
   * */
  const activeConfig = React.useMemo(() => {
    return totalConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl, totalConfigs]);
  /**
   * 显示的 搜索词
   * */
  const [newSearchName, setNewSearchName] = React.useState(searchName);
  /**
   * 跳转指令
   * */
  const push = React.useCallback((search: string, mainPage: string) => {
    historyStore.replace({ search: `searchName=${search}&mainPageUrl=${mainPage}`, name: `搜索(${search})` });
  }, []);
  const classes = useClasses();
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      if (activeConfig) {
        const search = new Search(activeConfig);
        return await search.getSearchList(searchName);
      }
    },
    undefined,
    [activeConfig, searchName],
  );
  React.useEffect(() => {
    if (searchName !== '') {
      fn().then();
    }
  }, [fn, searchName, activeConfig]);
  return (
    <MyTabs className={classes.all}>
      <SearchInput
        onSearchNameChange={setNewSearchName}
        searchName={newSearchName}
        activeConfig={activeConfig}
        onActiveConfigChange={(newConfig) => {
          push(searchName, newConfig?.mainPageUrl ?? '');
        }}
        onSearch={() => {
          push(newSearchName, mainPageUrl);
        }}
      />
      <div className={classes.main}>
        <Loading state={{ ...state, retry: fn }}>
          {activeConfig &&
            state.value?.map((value) => (
              <SearchItemView activeConfig={activeConfig} searchItem={value} key={value.novelId} />
            ))}
        </Loading>
      </div>
    </MyTabs>
  );
}
