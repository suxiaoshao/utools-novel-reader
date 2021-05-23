import MyTabs from '../components/myTabs';
import React from 'react';
import ThemeEdit from '../components/pages/setting/themeEdit';

export default function SettingPage(): JSX.Element {
  return (
    <MyTabs>
      <ThemeEdit />
    </MyTabs>
  );
}
