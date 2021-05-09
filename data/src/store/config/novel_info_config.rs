use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct NovelInfoConfig {
    info: InfoConfig,
    directory: DirectoryConfig,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct InfoConfig {
    name: String,
    author: String,
    #[serde(rename = "lastUpdateTime")]
    last_update_time: String,
    #[serde(rename = "latestChapterId")]
    latest_chapter_id: String,
    encoding: String,
    image: String,
    desc: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct DirectoryConfig {
    #[serde(rename = "chapterId")]
    chapter_id: String,
    encoding: String,
}
