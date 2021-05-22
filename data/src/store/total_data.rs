use js_sys::{Array, Function, Uint8Array};
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

use crate::log;
use crate::store::config::total_config::TotalConfig;
use crate::store::read_record::{Chapter, ReadRecord};
use crate::store::setting::SettingConfig;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct TotalData {
    #[serde(rename = "totalConfig")]
    total_config: Vec<TotalConfig>,
    #[serde(rename = "readRecord")]
    read_record: Vec<ReadRecord>,
    #[serde(skip, default = "Vec::new")]
    func: Vec<Function>,
    setting: SettingConfig,
}

/// # 变成数据
impl Into<Vec<u8>> for TotalData {
    fn into(self) -> Vec<u8> {
        Vec::from(serde_json::to_string(&self).unwrap())
    }
}

/// 数据文件相关
#[wasm_bindgen]
impl TotalData {
    /// # 读取数据
    #[wasm_bindgen(js_name=load)]
    pub fn load(buf: Vec<u8>) -> Self {
        match serde_json::from_slice(&buf) {
            Ok(value) => value,
            Err(_) => TotalData {
                total_config: TotalConfig::get_default(),
                read_record: vec![],
                func: vec![],
                setting: SettingConfig::get_default(),
            },
        }
    }
    /// # 更新数据
    #[wasm_bindgen(js_name=updateFromData)]
    pub fn update_from_data(&mut self, buf: Vec<u8>) {
        let new_data = Self::load(buf);
        self.read_record = new_data.read_record;
        self.total_config = new_data.total_config;
    }
    /// # 获取数据
    #[wasm_bindgen(js_name=toData)]
    pub fn to_data(&self) -> Vec<u8> {
        Vec::from(serde_json::to_string(&self).unwrap())
    }
    /// # 添加监听数据改变
    #[wasm_bindgen(js_name=addOnchangeFunc)]
    pub fn add_onchange_func(&mut self, func: js_sys::Function) {
        self.func.push(func);
    }
    pub fn on_update(&self) {
        self.func.iter().for_each(|func| {
            let this = JsValue::null();
            let arraybuffer = unsafe { Uint8Array::view(&self.to_data()) };
            let _ = func.call1(&this, &arraybuffer);
        })
    }
}

/// 阅读记录相关
#[wasm_bindgen]
impl TotalData {
    /// # 添加小说
    #[wasm_bindgen(js_name=addReadRecord)]
    pub fn add_read_record(&mut self, new_read_record: JsValue) -> bool {
        // 读取数据
        let new_read_record: ReadRecord = match JsValue::into_serde(&new_read_record) {
            Err(_) => return false,
            Ok(e) => e,
        };

        // 判断是否存在相应的配置
        if self
            .total_config
            .iter()
            .any(|config| new_read_record.match_url(&config.main_page_url))
        {
            // 是否存在
            match self
                .read_record
                .iter_mut()
                .find(|item| *item == &new_read_record)
            {
                // 不存在插入
                None => self.read_record.push(new_read_record),
                // 存在更新
                Some(item) => item.update(new_read_record),
            };
            self.on_update();
            true
        } else {
            false
        }
    }
    /// # 获取所有记录
    #[wasm_bindgen(js_name=getAllReadRecord)]
    pub fn get_all_read_record(&self) -> Array {
        self.read_record
            .iter()
            .filter_map(|x| JsValue::from_serde(x).ok())
            .collect()
    }
    /// # 查找是否已存在记录
    #[wasm_bindgen(js_name=checkExists)]
    pub fn check_exists(&self, novel_id: String, main_page_url: String) -> bool {
        self.read_record
            .iter()
            .any(|item| item.main_page_url == main_page_url && item.novel_id == novel_id)
    }
    /// # 删除阅读记录
    #[wasm_bindgen(js_name=removeRecord)]
    pub fn remove_record(&mut self, novel_id: String, main_page_url: String) {
        self.read_record = self
            .read_record
            .iter()
            .filter(|&item| item.main_page_url != main_page_url || item.novel_id != novel_id)
            .map(|item| item.clone())
            .collect();
        self.on_update();
    }
    /// # 更新阅读记录
    #[wasm_bindgen(js_name=updateRecord)]
    pub fn update_record(
        &mut self,
        chapter: JsValue,
        novel_id: String,
        main_page_url: String,
    ) -> bool {
        let chapter: Chapter = match JsValue::into_serde(&chapter) {
            Err(_) => return false,
            Ok(e) => e,
        };
        match self
            .read_record
            .iter_mut()
            .find(|item| item.main_page_url == main_page_url && item.novel_id == novel_id)
        {
            None => false,
            Some(item) => {
                item.chapter = chapter;
                self.on_update();
                true
            }
        }
    }
}

/// # 配置相关
#[wasm_bindgen]
impl TotalData {
    /// # 获取所有配置
    #[wasm_bindgen(js_name=getAllConfig)]
    pub fn get_all_config(&self) -> Vec<JsValue> {
        self.total_config
            .iter()
            .filter_map(|x| JsValue::from_serde(x).ok())
            .collect()
    }
}

/// # 设置相关
#[wasm_bindgen]
impl TotalData {
    /// # 获取所有配置
    #[wasm_bindgen(js_name=getSetting)]
    pub fn get_setting(&self) -> JsValue {
        JsValue::from(self.setting)
    }
    /// # 更新设置
    #[wasm_bindgen(js_name=updateSetting)]
    pub fn update_setting(&mut self, new_setting: JsValue) -> bool {
        let new_setting = match JsValue::into_serde(&new_setting) {
            Ok(e) => e,
            Err(_) => return false,
        };
        self.setting = new_setting;
        self.on_update();
        true
    }
}
