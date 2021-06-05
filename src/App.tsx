import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import SearchPage from './views/searchPage';
import ReadFile from './views/readFile';
import Bookshelf from './views/bookshelf';
import TestPage from './views/testPage';
import NovelPage from './views/novelPage';
import ChapterPage from './views/chapterPage';
import SettingPage from './views/settingPage';
import Sponsorship from './views/sponsorship';
import EditConfig from './views/editConfig';

function App(): JSX.Element {
  return (
    <HashRouter>
      <MyThemeProvider>
        <Switch>
          <Route path="/" exact>
            <SearchPage />
          </Route>
          <Route path="/bookshelf" exact>
            <Bookshelf />
          </Route>
          <Route path="/readFile" exact>
            <ReadFile />
          </Route>
          <Route path="/test" exact>
            <TestPage />
          </Route>
          <Route path="/novel" exact>
            <NovelPage />
          </Route>
          <Route path="/chapter" exact>
            <ChapterPage />
          </Route>
          <Route path="/setting" exact>
            <SettingPage />
          </Route>
          <Route path="/sponsorship" exact>
            <Sponsorship />
          </Route>
          <Route path="/editConfig" exact>
            <EditConfig />
          </Route>
        </Switch>
      </MyThemeProvider>
    </HashRouter>
  );
}

export default App;
