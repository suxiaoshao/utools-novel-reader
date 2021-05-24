use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Theme {
    pub(crate) name: String,
    #[serde(rename = "type")]
    pub(crate) dark_type: DarkType,
    pub(crate) background: Option<Background>,
}
#[wasm_bindgen]
#[derive(Deserialize, Serialize, Clone, Debug)]
pub enum DarkType {
    #[serde(rename = "light")]
    Light,
    #[serde(rename = "dark")]
    Dark,
}

#[wasm_bindgen]
#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct Background {
    pub(crate) paper: String,
    pub(crate) default: String,
}

impl Theme {
    pub fn get_default() -> Vec<Theme> {
        let dark = Theme {
            name: "暗黑".to_string(),
            dark_type: DarkType::Dark,
            background: None,
        };
        let light = Theme {
            name: "明亮".to_string(),
            dark_type: DarkType::Light,
            background: None,
        };
        let yellow = Theme {
            name: "明黄".to_string(),
            dark_type: DarkType::Light,
            background: Some(Background {
                paper: "#fff8e1".to_string(),
                default: "#fffde7".to_string(),
            }),
        };
        let green = Theme {
            name: "明绿".to_string(),
            dark_type: DarkType::Light,
            background: Some(Background {
                paper: "#e8f5e9".to_string(),
                default: "#f1f8e9".to_string(),
            }),
        };
        vec![dark, light, yellow, green]
    }
}
