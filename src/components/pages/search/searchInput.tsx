import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton, InputBase, Paper, Theme, Tooltip } from '@material-ui/core';
import MySelector from '../../common/mySelector';
import { ExitToApp, Search } from '@material-ui/icons';
import { TotalConfig } from '../../../utils/web/config/totalConfig';
import { useTotalConfigs } from '../../../utils/store/config.store';

export const useUrlStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1),
      flex: '0 0 auto',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    speedDial: {
      position: 'fixed',
      right: theme.spacing(2),
      top: theme.spacing(11),
      zIndex: 100,
    },
    loadingFather: {
      position: 'relative',
    },
    loading: {
      color: theme.palette.primary.main,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
  }),
);

export interface SearchInputProp {
  /**
   * 活跃的配置
   * */
  activeConfig: TotalConfig | undefined;

  /**
   * 修改活跃的配置
   * */
  onActiveConfigChange(newConfig: TotalConfig | undefined): void;

  /**
   * 搜索关键词
   * */
  searchName: string;

  /**
   * 修改搜索关键词
   * */
  onSearchNameChange(newSearchName: string): void;

  /**
   * 搜索
   * */
  onSearch(): void;
}

/**
 * @author sushao
 * @version 0.4.0
 * @since 0.4.0
 * @description 搜索输入框
 * */
export default function SearchInput(props: SearchInputProp): JSX.Element {
  const classes = useUrlStyles();
  const [totalConfigs] = useTotalConfigs();
  return (
    <Paper component="form" className={classes.form}>
      <MySelector<string | undefined>
        itemList={totalConfigs.map((value) => ({ text: value.name, value: value.mainPageUrl }))}
        onValueChange={(newValue) => {
          props.onActiveConfigChange(totalConfigs.find((value) => value.mainPageUrl === newValue));
        }}
        value={props.activeConfig?.mainPageUrl}
        className={classes.iconButton}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        placeholder="搜索内容"
        className={classes.input}
        value={props.searchName}
        onChange={(event) => {
          props.onSearchNameChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            props.onSearch();
          }
        }}
      />
      <Tooltip title={'前往源网站'}>
        <IconButton
          onClick={() => {
            utools.shellOpenExternal(props.activeConfig?.mainPageUrl ?? '');
          }}
        >
          <ExitToApp />
        </IconButton>
      </Tooltip>
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={'搜索'}>
        <IconButton onClick={props.onSearch} disabled={props.activeConfig === undefined}>
          <Search />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
