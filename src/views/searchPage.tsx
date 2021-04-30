import React from 'react';
import MyTabs from '../components/myTabs';
import { Search } from '../utils/web/search';
import { defaultConfigs } from '../utils/web/config/defaultConfig';
import SearchInput from '../components/pages/search/searchInput';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../utils/hooks/useAsyncFnWithNotify';
import { TotalConfig } from '../utils/web/config/totalConfig';
import { Loading } from '../components/common/loading';
import SearchItemView from '../components/pages/search/searchItemView';

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
  const [searchName, setSearchName] = React.useState<string>('');
  const [activeConfig, setActiveConfig] = React.useState<TotalConfig | undefined>(defaultConfigs[0]);
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
        onSearchNameChange={setSearchName}
        searchName={searchName}
        activeConfig={activeConfig}
        onActiveConfigChange={setActiveConfig}
        onSearch={fn}
      />
      <div className={classes.main}>
        <Loading state={{ ...state, retry: fn }}>
          {state.value?.map((value) => (
            <SearchItemView searchItem={value} key={value.novelId} />
          ))}
        </Loading>
      </div>
    </MyTabs>
  );
}
