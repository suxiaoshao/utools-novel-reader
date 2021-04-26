export interface Directory {
  url: string;
  chapter_id: string;
  chapter_id_regex: string;
  slice_left: number | false;
  slice_right: number | false;
}

export interface Info {
  url: string;
  name: string;
  author: string;
  last_update_time: string;
  latest_chapter_id: string;
  latest_chapter_id_regex: string;
}

export interface NovelInfo {
  directory: Directory;
  info: Info;
}
