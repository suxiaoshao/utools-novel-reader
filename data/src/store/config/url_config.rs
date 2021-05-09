use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct UrlConfig {
    search: String,
    #[serde(rename = "novelInfo")]
    novel_info: String,
    directory: String,
    chapter: String,
    #[serde(rename = "searchPlaceholder")]
    search_placeholder: String,
    #[serde(rename = "novelPlaceholder")]
    novel_placeholder: String,
    #[serde(rename = "chapterPlaceholder")]
    chapter_placeholder: String,
}
