use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

use crate::store::config::content_config::ContentConfig;
use crate::store::config::novel_info_config::NovelInfoConfig;
use crate::store::config::regex_config::RegexConfig;
use crate::store::config::search_config::SearchConfig;
use crate::store::config::url_config::UrlConfig;

use super::novel_info_config::{DirectoryConfig, InfoConfig};

/// # 总配置
/// main_page_url: 主页 url
///
/// name: 网站名字
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct TotalConfig {
    #[serde(rename = "mainPageUrl")]
    pub(crate) main_page_url: String,
    pub(crate) name: String,
    pub(crate) search: SearchConfig,
    pub(crate) novel: NovelInfoConfig,
    pub(crate) url: UrlConfig,
    pub(crate) content: ContentConfig,
    pub(crate) regex: RegexConfig,
}
impl TotalConfig {
    pub fn default() -> Vec<TotalConfig> {
        let biqubao = TotalConfig {
            main_page_url: "https://www.biqubao.com/".to_string(),
            name: "笔趣阁1".to_string(),
            search: SearchConfig {
                li: "body > div.result-list > div".to_string(),
                novel_id: "div.result-game-item-detail > h3 > a".to_string(),
                author_name:
                    "div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)"
                        .to_string(),
                latest_chapter_id: "div.result-game-item-detail > div > p:nth-child(4) > a"
                    .to_string(),
                update_time:
                    "div.result-game-item-detail > div > p:nth-child(3) > span:nth-child(2)"
                        .to_string(),
                image: "div.result-game-item-pic > a > img".to_string(),
                label: "div.result-game-item-detail > div > p:nth-child(2) > span:nth-child(2)"
                    .to_string(),
                desc: "div.result-game-item-detail > p".to_string(),
                encoding: "utf8".to_string(),
            },
            novel: NovelInfoConfig {
                info: InfoConfig {
                    name: "#info > h1".to_string(),
                    author: "#info > p:nth-child(2)".to_string(),
                    last_update_time: "#info > p:nth-child(4)".to_string(),
                    latest_chapter_id: "#info > p:nth-child(5) > a".to_string(),
                    encoding: "gbk".to_string(),
                    image: "#fmimg > img".to_string(),
                    desc: "#intro".to_string(),
                },
                directory: DirectoryConfig {
                    chapter_id: "#list > dl > dd > a".to_string(),
                    encoding: "gbk".to_string(),
                },
            },
            url: UrlConfig {
                search: "https://www.biqubao.com/search.php?q={##searchName##}".to_string(),
                novel_info: "https://www.biqubao.com/book/{##novelId##}/".to_string(),
                directory: "https://www.biqubao.com/book/{##novelId##}/".to_string(),
                chapter: "https://www.biqubao.com/book/{##novelId##}/{##chapterId##}.html"
                    .to_string(),
                search_placeholder: "{##searchName##}".to_string(),
                novel_placeholder: "{##novelId##}".to_string(),
                chapter_placeholder: "{##chapterId##}".to_string(),
            },
            content: ContentConfig {
                encoding: "gbk".to_string(),
                chapter_name: "#wrapper > div.content_read > div > div.bookname > h1".to_string(),
                novel_name: "#wrapper > div.footer > div.footer_cont > p:nth-child(1) > a"
                    .to_string(),
                pre_chapter_id: "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(1)".to_string(),
                next_chapter_id: "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)".to_string(),
                content: "#content".to_string(),
                content_split: Some("&nbsp;".to_string()),
            },
            regex: RegexConfig {
                novel: "book\\/(?<id>.*?)\\/".to_string(),
                novel_id_placeholder: "id".to_string(),
                chapter_id_placeholder: "id".to_string(),
                chapter: "\\/(?<id>\\d+).html".to_string(),
            },
        };
        vec![biqubao]
    }
}
#[cfg(test)]
mod test {
    use crate::store::config::total_config::TotalConfig;

    #[test]
    fn get_default() {
        let data = TotalConfig::default();
        println!("{}",serde_json::to_string_pretty(&data[0]).unwrap());
        println!("{}",serde_json::to_string_pretty(&data[1]).unwrap());
    }
}
