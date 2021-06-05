import React from 'react';
import { TotalConfig } from '../../../../utils/web/config/totalConfig';
import { Chip, Menu, MenuItem } from '@material-ui/core';
import { getClassName } from '../../../../utils/getClassName';
import { configStore } from '../../../../utils/store/config.store';
import { notifySubject } from '../../../common/notify';

export interface ConfigChipProp {
  className?: string;
  config: TotalConfig;
}

export default function ConfigChip(props: ConfigChipProp): JSX.Element {
  /**
   * menu 的位置信息,不显示时为 null
   * */
  const [menuPosition, setMenuPosition] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);
  const deleteConfig = React.useCallback(() => {
    if (!configStore.deleteByMainPageUrl(props.config.mainPageUrl)) {
      notifySubject.next({
        message: '默认源不可删除',
        options: {
          variant: 'error',
        },
      });
    }
  }, [props.config.mainPageUrl]);
  return (
    <>
      <Chip
        className={getClassName(props.className)}
        onClick={(event) => {
          /**
           * 右键点击时设置点击的坐标为 menu的位置
           * */
          event.preventDefault();
          setMenuPosition({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          });
        }}
        onDelete={deleteConfig}
        color={'primary'}
        label={props.config.name}
      />
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={menuPosition !== null ? { top: menuPosition.mouseY, left: menuPosition.mouseX } : undefined}
        open={menuPosition !== null}
        onClose={() => {
          setMenuPosition(null);
        }}
      >
        <MenuItem
          onClick={() => {
            utools.shellOpenExternal(props.config.mainPageUrl);
            setMenuPosition(null);
          }}
        >
          打开源网站
        </MenuItem>
        <MenuItem
          onClick={async () => {
            deleteConfig();
            setMenuPosition(null);
          }}
        >
          删除
        </MenuItem>
      </Menu>
    </>
  );
}
