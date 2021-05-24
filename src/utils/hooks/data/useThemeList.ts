import React from 'react';
import { ThemeValue } from '../../store/setting.store';
import { TotalDataBuild } from '../../data/totalData';

export function useThemeList(): ThemeValue[] {
  const [themeList] = React.useState<ThemeValue[]>(TotalDataBuild.getTotalData().getAllTheme());
  return themeList;
}
