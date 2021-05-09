use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct ContentConfig {
    encoding: String,
    #[serde(rename = "chapterName")]
    chapter_name: String,
    #[serde(rename = "novelName")]
    novel_name: String,
    #[serde(rename = "preChapterId")]
    pre_chapter_id: String,
    #[serde(rename = "nextChapterId")]
    next_chapter_id: String,
    content: String,
    #[serde(rename = "contentSplit")]
    content_split: Option<String>,
}
