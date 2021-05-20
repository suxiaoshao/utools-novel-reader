import React from 'react';
import { Breadcrumbs, Link, makeStyles } from '@material-ui/core';
import { historyStore, useAllLocation } from '../utils/store/history.store';
import { createStyles } from '@material-ui/core/styles';
import { getClassName } from '../utils/getClassName';

const useClass = makeStyles((theme) =>
  createStyles({
    page: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    breadcrumbs: {
      flex: '0 0 auto',
      margin: theme.spacing(1),
    },
    main: {
      flex: '1 1 0',
      overflow: 'hidden',
    },
  }),
);

export interface MyBreadcrumbsProp {
  children?: React.ReactNode;
  classname?: string;
  pageClassName?: string;
}

export default function MyBreadcrumbs(props: MyBreadcrumbsProp): JSX.Element {
  const [allLocation] = useAllLocation();
  const classes = useClass();
  return (
    <div className={getClassName(classes.page, props.pageClassName)}>
      <Breadcrumbs maxItems={3} className={classes.breadcrumbs}>
        {allLocation.map((value, index) => (
          <Link
            color={index !== allLocation.length - 1 ? 'inherit' : 'textPrimary'}
            href={`#${value.pathname}${value.search}`}
            key={value.pathname}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              historyStore.goIndex(index);
            }}
          >
            {value.name}
          </Link>
        ))}
      </Breadcrumbs>
      <main className={`${classes.main} ${props.classname}`}>{props.children}</main>
    </div>
  );
}
