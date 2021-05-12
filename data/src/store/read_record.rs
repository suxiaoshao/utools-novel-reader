use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// # 阅读记录
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug)]
pub struct ReadRecord {
    pub(crate) author: String,
    pub(crate) name: String,
    pub(crate) chapter: Chapter,
    #[serde(rename = "mainPageUrl")]
    pub(crate) main_page_url: String,
    #[serde(rename = "novelId")]
    pub(crate) novel_id: String,
}
#[wasm_bindgen]
impl ReadRecord {
    #[wasm_bindgen]
    pub fn match_url(&self, url: &str) -> bool {
        self.main_page_url == url
    }
    pub fn update(&mut self, other: Self) {
        self.name = other.name;
        self.author = other.author;
        self.chapter = other.chapter;
    }
}

impl PartialEq for ReadRecord {
    fn eq(&self, other: &Self) -> bool {
        self.novel_id == other.novel_id && self.main_page_url == other.main_page_url
    }
}
impl Eq for ReadRecord {}
/// # 章节数据
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug)]
pub struct Chapter {
    name: String,
    #[serde(rename = "chapterId")]
    chapter_id: String,
}
