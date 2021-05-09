import React from 'react';
import { historyStore } from '../../utils/store/history.store';
import { Link } from '@material-ui/core';
import { Chapter } from '../../utils/web/novelInfo';

export interface ChapterLinkProp {
  chapter: Chapter;
  novelId: string;
  url: string;
  className?: string;
}

export default function ChapterLink(props: ChapterLinkProp): JSX.Element {
  return (
    <Link
      className={props.className}
      href={`#/chapter?novelId=${props.novelId}&url=${props.url}&chapterId=${props.chapter.chapterId}`}
      onClick={(event: React.MouseEvent) => {
        event.preventDefault();
        historyStore.push({
          pathname: '/chapter',
          search: `?novelId=${props.novelId}&url=${props.url}&chapterId=${props.chapter.chapterId}`,
          name: props.chapter.name,
        });
      }}
    >
      {props.chapter.name}
    </Link>
  );
}
