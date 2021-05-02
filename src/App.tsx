import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import SearchPage from './views/searchPage';
import ReadFile from './views/readFile';
import Bookshelf from './views/bookshelf';
import TestPage from './views/testPage';
import NovelPage from './views/novelPage';

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
        </Switch>
      </MyThemeProvider>
    </HashRouter>
  );
}

export default App;
