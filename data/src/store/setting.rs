use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

use crate::store::theme::{DarkType, Theme};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SettingConfig {
    theme: ThemeEnum,
    #[serde(rename = "fontSize")]
    font_size: u8,
}

impl SettingConfig {
    /// # 获取默认设置
    pub fn get_default() -> Self {
        Self {
            theme: ThemeEnum::AutoTheme(AutoTheme::get_default()),
            font_size: 1,
        }
    }
    /// # 检查设置是否合法
    pub fn check_value(&mut self) {
        match self.font_size {
            1..=10 => {}
            _ => {
                self.font_size = 1;
            }
        };
    }
}
impl From<SettingConfig> for JsValue {
    fn from(setting: SettingConfig) -> Self {
        JsValue::from_serde(&setting).unwrap()
    }
}

/// # 自动样式
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AutoTheme {
    light: Theme,
    dark: Theme,
}
impl AutoTheme {
    fn get_default() -> Self {
        Self {
            light: Theme {
                name: "明亮".to_string(),
                dark_type: DarkType::Light,
                background: None,
            },
            dark: Theme {
                name: "暗黑".to_string(),
                dark_type: DarkType::Dark,
                background: None,
            },
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(untagged)]
pub enum ThemeEnum {
    AutoTheme(AutoTheme),
    SpecifyTheme(Theme),
}
#[cfg(test)]
mod test {
    use crate::store::setting::{SettingConfig, ThemeEnum};
    use crate::store::theme::{DarkType, Theme};

    #[test]
    fn auto_theme() {
        let default_string = r#"{"theme":{"light":{"name":"明亮","type":"light","background":null},"dark":{"name":"暗黑","type":"dark","background":null}},"fontSize":1}"#;
        let from_default_string: SettingConfig = serde_json::from_str(default_string).unwrap();
        if let ThemeEnum::AutoTheme(theme) = from_default_string.theme {
            println!("{:#?}", theme);
        } else {
            panic!("")
        }
        assert_eq!(from_default_string.font_size, 1);
        let default_setting = SettingConfig::get_default();
        assert_eq!(
            default_string,
            serde_json::to_string(&default_setting).unwrap()
        );
    }
    #[test]
    fn s_theme() {
        let string = r#"{"theme":{"name":"暗黑","type":"dark","background":null},"fontSize":1}"#;
        let setting = SettingConfig {
            theme: ThemeEnum::SpecifyTheme(Theme {
                name: "暗黑".to_string(),
                dark_type: DarkType::Dark,
                background: None,
            }),
            font_size: 1,
        };
        let from_string: SettingConfig = serde_json::from_str(string).unwrap();
        if let ThemeEnum::SpecifyTheme(_) = from_string.theme {
        } else {
            panic!("")
        }
        assert_eq!(string, serde_json::to_string(&setting).unwrap());
    }
    #[test]
    fn check_setting() {
        let mut setting = SettingConfig {
            theme: ThemeEnum::SpecifyTheme(Theme {
                name: "暗黑".to_string(),
                dark_type: DarkType::Dark,
                background: None,
            }),
            font_size: 1,
        };
        println!("{:?}", serde_json::to_string(&setting).unwrap());
        setting.check_value();
        assert_eq!(setting.font_size, 1);
        setting.font_size = 5;
        setting.check_value();
        assert_eq!(setting.font_size, 5);
        setting.font_size = 0;
        setting.check_value();
        assert_eq!(setting.font_size, 1);
        setting.font_size = 11;
        setting.check_value();
        assert_eq!(setting.font_size, 1);
    }
}
