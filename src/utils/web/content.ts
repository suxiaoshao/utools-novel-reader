export interface Content {
  url: string;
  chapter_name: string;
  novel_name: string;
  pre_chapter_id: string;
  pre_chapter_id_regex: string;
  next_chapter_id: string;
  next_chapter_id_regex: string;
  content: string;
  content_split: string | false;
}
