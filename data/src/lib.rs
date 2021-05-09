extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use crate::store::total_data::TotalData;

mod store;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: String);
    #[wasm_bindgen(js_namespace = console,js_name = log)]
    fn log_u8(s: u8);
}
#[wasm_bindgen(js_name=initData)]
pub fn init_data(buf: Vec<u8>) -> Vec<u8> {
    let total_data=TotalData::load(buf);
    Vec::from(serde_json::to_string(&total_data).unwrap())
}
#[wasm_bindgen]
pub fn test1() -> Vec<u8> {
    vec![1, 234]
}
