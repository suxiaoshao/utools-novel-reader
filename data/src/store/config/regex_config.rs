use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct RegexConfig {
    pub(crate) novel: String,
    #[serde(rename = "novelIdPlaceholder")]
    pub(crate) novel_id_placeholder: String,
    #[serde(rename = "chapterIdPlaceholder")]
    pub(crate) chapter_id_placeholder: String,
    pub(crate) chapter: String,
}
