import React from 'react';
import MyTabs from '../components/myTabs';
import { Search } from '../utils/web/search';
import { defaultConfigs, NovelConfig } from '../utils/web/defaultConfig';
import SearchInput from '../components/pages/search/searchInput';

export default function SearchPage(): JSX.Element {
  const [searchName, setSearchName] = React.useState<string>('');
  const [activeConfig, setActiveConfig] = React.useState<NovelConfig | undefined>(defaultConfigs[0]);
  return (
    <MyTabs>
      <SearchInput
        onSearchNameChange={setSearchName}
        searchName={searchName}
        activeConfig={activeConfig}
        onActiveConfigChange={setActiveConfig}
        onSearch={async () => {
          if (activeConfig) {
            const search = new Search(activeConfig.search, activeConfig.encoding);
            const data = await search.getSearchList(searchName);
            console.log(data);
          }
        }}
      />
    </MyTabs>
  );
}
