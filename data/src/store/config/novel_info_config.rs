use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct NovelInfoConfig {
    pub(crate) info: InfoConfig,
    pub(crate) directory: DirectoryConfig,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct InfoConfig {
    pub(crate) name: String,
    pub(crate) author: String,
    #[serde(rename = "lastUpdateTime")]
    pub(crate) last_update_time: String,
    #[serde(rename = "latestChapterId")]
    pub(crate) latest_chapter_id: String,
    pub(crate) encoding: String,
    pub(crate) image: String,
    pub(crate) desc: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct DirectoryConfig {
    #[serde(rename = "chapterId")]
    pub(crate) chapter_id: String,
    pub(crate) encoding: String,
}
