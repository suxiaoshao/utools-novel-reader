use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct SearchConfig {
    pub(crate) li: String,
    #[serde(rename = "novelId")]
    pub(crate) novel_id: String,
    #[serde(rename = "authorName")]
    pub(crate) author_name: String,
    #[serde(rename = "latestChapterId")]
    pub(crate) latest_chapter_id: String,
    #[serde(rename = "updateTime")]
    pub(crate) update_time: String,
    pub(crate) image: String,
    pub(crate) label: String,
    pub(crate) desc: String,
    pub(crate) encoding: String,
}
