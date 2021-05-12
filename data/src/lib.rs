extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

mod store;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: JsValue);
    #[wasm_bindgen(js_namespace = console,js_name = log)]
    fn log_u8(s: u8);
}
