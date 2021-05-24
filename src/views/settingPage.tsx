import MyTabs from '../components/myTabs';
import React from 'react';
import ThemeEdit from '../components/pages/setting/themeEdit';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FontCard from '../components/pages/setting/fontCard';

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
    <MyTabs classname={classes.page}>
      <ThemeEdit />
      <FontCard />
    </MyTabs>
  );
}
