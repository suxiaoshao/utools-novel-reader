import React from 'react';
import MyTabs from '../components/myTabs';
import { Button, TextField } from '@material-ui/core';
import { Search } from '../utils/web/search';
import { configs } from '../utils/web/novelConfig';

export default function SearchPage(): JSX.Element {
  const [searchName, setSearchName] = React.useState<string>('');
  return (
    <MyTabs>
      <TextField
        value={searchName}
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
        label={'搜索'}
      />
      <Button
        onClick={async () => {
          const search = new Search(configs[1].search, configs[1].encoding);
          const data = await search.getSearchList(searchName);
          console.log(data);
        }}
      >
        确认
      </Button>
    </MyTabs>
  );
}
