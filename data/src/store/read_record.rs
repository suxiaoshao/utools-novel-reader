use std::cmp::Ordering;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

/// # 阅读记录
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ReadRecord {
    pub(crate) author: String,
    pub(crate) name: String,
    pub(crate) chapter: Chapter,
    #[serde(rename = "mainPageUrl")]
    pub(crate) main_page_url: String,
    #[serde(rename = "novelId")]
    pub(crate) novel_id: String,
    pub(crate) image: Option<String>,
    pub(crate) desc: String,
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
        self.image = other.image;
        self.desc = other.desc;
    }
}

impl PartialEq for ReadRecord {
    fn eq(&self, other: &Self) -> bool {
        self.novel_id == other.novel_id && self.main_page_url == other.main_page_url
    }
}
impl Eq for ReadRecord {}
impl PartialOrd for ReadRecord {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        if self.main_page_url < other.main_page_url {
            Some(Ordering::Less)
        } else if self.main_page_url > other.main_page_url {
            Some(Ordering::Greater)
        } else {
            Some(self.novel_id.cmp(&other.novel_id))
        }
    }
}
impl Ord for ReadRecord {
    fn cmp(&self, other: &Self) -> Ordering {
        if self.main_page_url < other.main_page_url {
            Ordering::Less
        } else if self.main_page_url > other.main_page_url {
            Ordering::Greater
        } else {
            self.novel_id.cmp(&other.novel_id)
        }
    }
}
/// # 章节数据
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq)]
pub struct Chapter {
    name: String,
    #[serde(rename = "chapterId")]
    chapter_id: String,
}
