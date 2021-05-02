import React from 'react';
import MyTabs from '../components/myTabs';
import { Search } from '../utils/web/search';
import { defaultConfigs } from '../utils/web/config/defaultConfig';
import SearchInput from '../components/pages/search/searchInput';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../utils/hooks/useAsyncFnWithNotify';
import { Loading } from '../components/common/loading';
import SearchItemView from '../components/pages/search/searchItemView';
import { useQuery } from '../utils/hooks/useQuery';
import { myHistory } from '../utils/myHistory';

const useClasses = makeStyles((theme) =>
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
  /**
   * 搜索关键词
   * */
  const searchName = useQuery('searchName') ?? '';
  /**
   * 主页url
   * */
  const mainPageUrl = useQuery('mainPageUrl') ?? defaultConfigs[0]?.mainPageUrl ?? '';
  /**
   * 活跃配置
   * */
  const activeConfig = React.useMemo(() => {
    return defaultConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl]);
  /**
   * 跳转指令
   * */
  const push = React.useCallback((search: string, mainPage: string) => {
    myHistory.replace({ search: `searchName=${search}&mainPageUrl=${mainPage}` });
  }, []);
  const classes = useClasses();
  const [state, fn] = useAsyncFnWithNotify(
    async () => {
      if (activeConfig) {
        const search = new Search(activeConfig);
        const data = await search.getSearchList(searchName);
        console.log(data);
        return data;
      }
    },
    undefined,
    [activeConfig, searchName],
  );
  return (
    <MyTabs classname={classes.all}>
      <SearchInput
        onSearchNameChange={(newSearchName) => {
          push(newSearchName, mainPageUrl);
        }}
        searchName={searchName}
        activeConfig={activeConfig}
        onActiveConfigChange={(newConfig) => {
          push(searchName, newConfig?.mainPageUrl ?? '');
        }}
        onSearch={fn}
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
