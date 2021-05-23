use std::marker::Copy;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub struct SettingConfig {
    theme: Theme,
    #[serde(rename = "fontSize")]
    font_size: u8,
}

impl SettingConfig {
    /// # 获取默认设置
    pub fn get_default() -> Self {
        Self {
            theme: Theme::AutoTheme(AutoTheme::get_default()),
            font_size: 1,
        }
    }
    /// # 检查设置是否合法
    pub fn check_value(&mut self) {
        match self.font_size {
            1..=5 => {}
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
#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub struct AutoTheme {
    light: ThemeValue,
    dark: ThemeValue,
}
impl AutoTheme {
    fn get_default() -> Self {
        Self {
            light: ThemeValue::Light,
            dark: ThemeValue::Dark,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
#[serde(untagged)]
pub enum Theme {
    AutoTheme(AutoTheme),
    SpecifyTheme(ThemeValue),
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum ThemeValue {
    #[serde(rename = "dark")]
    Dark,
    #[serde(rename = "light")]
    Light,
    #[serde(rename = "green")]
    Green,
    #[serde(rename = "yellow")]
    Yellow,
}
#[cfg(test)]
mod test {
    use crate::store::setting::{SettingConfig, Theme, ThemeValue};

    #[test]
    fn auto_theme() {
        let default_string = r#"{"theme":{"light":"light","dark":"dark"},"fontSize":1}"#;
        let from_default_string: SettingConfig = serde_json::from_str(default_string).unwrap();
        if let Theme::AutoTheme(theme) = from_default_string.theme {
            if let ThemeValue::Dark = theme.dark {
            } else {
                panic!("")
            }
            if let ThemeValue::Light = theme.light {
            } else {
                panic!("")
            }
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
        let string = r#"{"theme":"dark","fontSize":1}"#;
        let setting = SettingConfig {
            theme: Theme::SpecifyTheme(ThemeValue::Dark),
            font_size: 1,
        };
        let from_string: SettingConfig = serde_json::from_str(string).unwrap();
        if let Theme::SpecifyTheme(theme) = from_string.theme {
            if let ThemeValue::Dark = theme {
            } else {
                panic!("");
            }
        } else {
            panic!("")
        }
        assert_eq!(string, serde_json::to_string(&setting).unwrap());
    }
    #[test]
    fn check_setting() {
        let mut setting = SettingConfig {
            theme: Theme::SpecifyTheme(ThemeValue::Dark),
            font_size: 1,
        };
        setting.check_value();
        assert_eq!(setting.font_size, 1);
        setting.font_size = 5;
        setting.check_value();
        assert_eq!(setting.font_size, 5);
        setting.font_size = 0;
        setting.check_value();
        assert_eq!(setting.font_size, 1);
        setting.font_size = 6;
        setting.check_value();
        assert_eq!(setting.font_size, 1);
    }
}
