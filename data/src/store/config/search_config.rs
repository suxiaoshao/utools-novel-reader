use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct SearchConfig {
    li: String,
    #[serde(rename = "novelId")]
    novel_id: String,
    #[serde(rename = "authorName")]
    author_name: String,
    #[serde(rename = "latestChapterId")]
    latest_chapter_id: String,
    #[serde(rename = "updateTime")]
    update_time: String,
    image: String,
    label: String,
    desc: String,
    encoding: String,
}
