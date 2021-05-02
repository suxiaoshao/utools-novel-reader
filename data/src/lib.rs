extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
use serde_json::Value;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = console,js_name = log)]
    fn log_u8(s: u8);
}
#[wasm_bindgen(js_name=initData)]
pub fn init_data(buf: Vec<u8>)->Vec<u8> {
    if buf.is_empty() {
        let mut  a= serde_json::Map::new();
        a.insert("test".to_string(),Value::String("sad".to_string()));
        Vec::from(serde_json::to_string(&a).unwrap())
    }else{
        buf
    }
}
#[wasm_bindgen]
pub fn test1()->Vec<u8> {
    vec![1,234]
}
