import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton, InputBase, Paper, Theme, Tooltip } from '@material-ui/core';
import MySelector from '../../common/mySelector';
import { defaultConfigs, NovelConfig } from '../../../utils/web/defaultConfig';
import { Search } from '@material-ui/icons';

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
  activeConfig: NovelConfig | undefined;

  /**
   * 修改活跃的配置
   * */
  onActiveConfigChange(newConfig: NovelConfig | undefined): void;

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
  return (
    <Paper component="form" className={classes.form}>
      <MySelector<string | undefined>
        itemList={defaultConfigs.map((value) => ({ text: value.name, value: value.url }))}
        onValueChange={(newValue) => {
          props.onActiveConfigChange(defaultConfigs.find((value) => value.url === newValue));
        }}
        value={props.activeConfig?.url}
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
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Tooltip title={'搜索'}>
        <IconButton disabled={props.activeConfig === undefined}>
          <Search onClick={props.onSearch} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
