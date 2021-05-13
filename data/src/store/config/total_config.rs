use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

use crate::store::config::content_config::ContentConfig;
use crate::store::config::novel_info_config::NovelInfoConfig;
use crate::store::config::regex_config::RegexConfig;
use crate::store::config::search_config::SearchConfig;
use crate::store::config::url_config::UrlConfig;

/// # 总配置
/// main_page_url: 主页 url
///
/// name: 网站名字
#[wasm_bindgen]
#[derive(Serialize, Deserialize, Debug)]
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
#[wasm_bindgen]
impl TotalConfig {
    #[wasm_bindgen]
    pub fn get_default() -> TotalConfig {
        let data = r##"{"name":"笔趣阁1","mainPageUrl":"https://www.biqubao.com/","url":{"search":"https://www.biqubao.com/search.php?q={##searchName##}","novelInfo":"https://www.biqubao.com/book/{##novelId##}/","directory":"https://www.biqubao.com/book/{##novelId##}/","chapter":"https://www.biqubao.com/book/{##novelId##}/{##chapterId##}.html","searchPlaceholder":"{##searchName##}","novelPlaceholder":"{##novelId##}","chapterPlaceholder":"{##chapterId##}"},"regex":{"novel":"book\\/(?<id>.*?)\\/","novelIdPlaceholder":"id","chapterIdPlaceholder":"id","chapter":"\\/(?<id>\\d+).html"},"search":{"encoding":"utf8","li":"body > div.result-list > div","novelId":"div.result-game-item-detail > h3 > a","authorName":"div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)","latestChapterId":"div.result-game-item-detail > div > p:nth-child(4) > a","updateTime":"div.result-game-item-detail > div > p:nth-child(3) > span:nth-child(2)","image":"div.result-game-item-pic > a > img","desc":"div.result-game-item-detail > p","label":"div.result-game-item-detail > div > p:nth-child(2) > span:nth-child(2)"},"novel":{"directory":{"encoding":"gbk","chapterId":"#list > dl > dd > a"},"info":{"encoding":"gbk","name":"#info > h1","author":"#info > p:nth-child(2)","lastUpdateTime":"#info > p:nth-child(4)","latestChapterId":"#info > p:nth-child(5) > a","image":"#fmimg > img","desc":"#intro"}},"content":{"encoding":"gbk","chapterName":"#wrapper > div.content_read > div > div.bookname > h1","novelName":"#wrapper > div.footer > div.footer_cont > p:nth-child(1) > a","preChapterId":"#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(1)","nextChapterId":"#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)","content":"#content","contentSplit":"&nbsp;"}}"##;
        serde_json::from_str(data).unwrap()
    }
}
#[cfg(test)]
mod test {
    use crate::store::config::total_config::TotalConfig;

    #[test]
    fn get_default() {
        let data = TotalConfig::get_default();
        println!("{:#?}", data);
    }
}
