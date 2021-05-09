use crate::store::config::total_config::TotalConfig;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct TotalData {
    pub total_config: Vec<TotalConfig>,
}
impl TotalData {
    pub fn load(buf: Vec<u8>) -> Self {
        match serde_json::from_slice(&buf) {
            Ok(value) => value,
            Err(_) => TotalData {
                total_config: vec![TotalConfig::get_default()],
            },
        }
    }
}
