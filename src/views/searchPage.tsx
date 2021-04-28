import React from 'react';
import MyTabs from '../components/myTabs';
import { Search } from '../utils/web/search';
import { defaultConfigs } from '../utils/web/config/defaultConfig';
import SearchInput from '../components/pages/search/searchInput';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useAsyncFnWithNotify } from '../utils/hooks/useAsyncFnWithNotify';
import { Loading } from '../components/common/loading';
import {
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { TotalConfig } from '../utils/web/config/totalConfig';

const useClasses = makeStyles((theme) =>
  createStyles({
    all: {
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      margin: theme.spacing(1),
      height: `calc(100% - ${theme.spacing(1)}px)`,
      width: `calc(100% - ${theme.spacing(1) * 2}px) !important`,
      flex: '1 1 0',
      marginTop: 0,
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
      <TableContainer component={Paper} className={classes.main}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>小说名</TableCell>
              <TableCell>作者</TableCell>
              <TableCell>更新时间</TableCell>
              <TableCell>最新章节</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Loading state={{ ...state, retry: fn }}>
              {state.value &&
                state.value.map((value) => (
                  <TableRow key={value.novelId}>
                    <TableCell>
                      <Button>{value.novelName}</Button>
                    </TableCell>
                    <TableCell>{value.authorName}</TableCell>
                    <TableCell>{value.updateTime}</TableCell>
                    <TableCell>
                      <Link>{value.latestChapterName}</Link>
                    </TableCell>
                  </TableRow>
                ))}
            </Loading>
          </TableBody>
        </Table>
      </TableContainer>
    </MyTabs>
  );
}
