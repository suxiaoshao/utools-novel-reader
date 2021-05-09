use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug)]
pub struct RegexConfig {
    novel: String,
    #[serde(rename = "novelIdPlaceholder")]
    novel_id_placeholder: String,
    #[serde(rename = "chapterIdPlaceholder")]
    chapter_id_placeholder: String,
    chapter: String,
}
