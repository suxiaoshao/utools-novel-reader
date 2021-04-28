import React from 'react';
import { CircularProgress, createStyles, IconButton, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorImage from '../../assets/monkey.png';
import { getClassName } from '../../utils/getClassName';
import { Refresh } from '@material-ui/icons';

type LoadingState<T> =
  | {
      retry: () => void;
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      retry: () => void;
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      retry: () => void;
      loading: true;
      error?: Error | undefined;
      value?: T | undefined;
    }
  | {
      retry: () => void;
      loading: false;
      error?: undefined;
      value: T;
    };

export interface LoadingProp<T> {
  /**
   * 状态
   * */
  state: LoadingState<T>;
  /**
   * 成功组件
   * */
  children: React.ReactNode;
}

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    all: {
      flex: '1 1 0',
    },
    error: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: theme.spacing(30),
      marginBottom: theme.spacing(5),
    },
  }),
);

/**
 * loading 数据
 * */
export function Loading<T>(props: LoadingProp<T>): JSX.Element {
  const classes = useStyle();
  return (
    <>
      {props.state.loading ? (
        <div className={classes.main}>
          <CircularProgress size={80} />
        </div>
      ) : props.state.error ? (
        <div className={getClassName(classes.main, classes.error)}>
          <img alt={'错误'} className={classes.image} src={ErrorImage} />
          <Typography variant={'h6'} color={'secondary'}>
            {props.state.error.message}
            <Tooltip title={'刷新'}>
              <IconButton onClick={props.state.retry} color={'secondary'}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Typography>
        </div>
      ) : (
        props.children
      )}
    </>
  );
}
