use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct UrlConfig {
    pub(crate) search: String,
    #[serde(rename = "novelInfo")]
    pub(crate) novel_info: String,
    pub(crate) directory: String,
    pub(crate) chapter: String,
    #[serde(rename = "searchPlaceholder")]
    pub(crate) search_placeholder: String,
    #[serde(rename = "novelPlaceholder")]
    pub(crate) novel_placeholder: String,
    #[serde(rename = "chapterPlaceholder")]
    pub(crate) chapter_placeholder: String,
}
