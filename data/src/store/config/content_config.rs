use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ContentConfig {
    pub(crate) encoding: String,
    #[serde(rename = "chapterName")]
    pub(crate) chapter_name: String,
    #[serde(rename = "novelName")]
    pub(crate) novel_name: String,
    #[serde(rename = "preChapterId")]
    pub(crate) pre_chapter_id: String,
    #[serde(rename = "nextChapterId")]
    pub(crate) next_chapter_id: String,
    pub(crate) content: String,
    #[serde(rename = "contentSplit")]
    pub(crate) content_split: Option<String>,
}
