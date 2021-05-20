import React from 'react';
import MyTabs from '../components/myTabs';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import ChapterLink from '../components/common/chapterLink';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import { useReadRecords } from '../utils/hooks/data/useReadRecords';
import { TotalDataBuild } from '../utils/data/totalData';
import { historyStore } from '../utils/store/history.store';

const useClasses = makeStyles((theme) =>
  createStyles({
    table: {
      margin: theme.spacing(1),
      width: `calc(100% - ${theme.spacing(2)}px)`,
      overflow: 'auto',
      height: `calc(100% - ${theme.spacing(2)}px)`,
    },
    listItem: {
      maxWidth: theme.spacing(30),
    },
  }),
);

export default function Bookshelf(): JSX.Element {
  const { readRecords, updateReadRecords } = useReadRecords();
  const classes = useClasses();
  return (
    <MyTabs>
      <TableContainer className={classes.table} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>小说信息</TableCell>
              <TableCell>作者</TableCell>
              <TableCell>最后阅读章节</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {readRecords.map((value) => (
              <TableRow key={value.novelId + value.mainPageUrl}>
                <TableCell padding={'none'} className={classes.listItem}>
                  <ListItem
                    button
                    onClick={() => {
                      historyStore.push({
                        pathname: '/novel',
                        search: `novelId=${value.novelId}&url=${value.mainPageUrl}`,
                        name: value.name,
                      });
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={value.image ?? undefined} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={value.name}
                      secondary={value.desc}
                      secondaryTypographyProps={{ noWrap: true }}
                    />
                  </ListItem>
                </TableCell>
                <TableCell>{value.author}</TableCell>
                <TableCell>
                  <ChapterLink chapter={value.chapter} novelId={value.novelId} url={value.mainPageUrl} />
                </TableCell>
                <TableCell padding={'none'}>
                  <Tooltip title={'删除记录'}>
                    <IconButton
                      onClick={() => {
                        const totalData = TotalDataBuild.getTotalData();
                        totalData.removeRecord(value.novelId, value.mainPageUrl);
                        updateReadRecords();
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MyTabs>
  );
}
