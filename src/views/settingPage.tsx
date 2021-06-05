import MyTabs from '../components/myTabs';
import React from 'react';
import ThemeEdit from '../components/pages/setting/themeEdit/themeEdit';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FontCard from '../components/pages/setting/fontCard';
import DocsMore from '../components/pages/setting/DocsMore';
import ConfigCard from '../components/pages/setting/configCard/configCard';

const useClasses = makeStyles(() =>
  createStyles({
    page: {
      overflow: 'auto',
    },
  }),
);

export default function SettingPage(): JSX.Element {
  const classes = useClasses();
  return (
    <MyTabs className={classes.page}>
      <ThemeEdit />
      <FontCard />
      <ConfigCard />
      <DocsMore />
    </MyTabs>
  );
}
