import React from 'react';
import '../../../utils/edit/init';
import { editor } from 'monaco-editor';
import { model } from '../../../utils/edit/init';
import { useTheme } from '@material-ui/core';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 可写情况下的 editProp
 * */
export interface NotReadOnlyEditProp {
  /**
   * 编辑器组建的类名
   * */
  className?: string;
  /**
   * 要显示的代码字符串
   * */
  code: string;

  /**
   * 当编辑器代码改变时触发的方法
   * */
  onChangeCode?(newCode: string): void;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 编辑器组件
 * */
export default function Edit(props: NotReadOnlyEditProp): JSX.Element {
  /**
   * 编辑器绑定的 dom 的引用
   * */
  const editRef = React.useRef<HTMLDivElement>(null);
  /**
   * 编辑器实体
   * */
  const [edit, setEdit] = React.useState<editor.IStandaloneCodeEditor | undefined>();
  const theme = useTheme();
  /**
   * 编辑器要绑定的 dom 生成时,再这个 dom 上新建一个编辑器,并赋值给 edit
   * */
  React.useEffect(() => {
    if (editRef.current !== null) {
      setEdit(
        editor.create(editRef?.current, {
          theme: theme.palette.type === 'dark' ? 'vs-dark' : undefined,
          automaticLayout: true,
          fontSize: 16,
          minimap: {
            enabled: true,
          },
          model,
          hover: {
            enabled: true,
            delay: 100,
          },
        }),
      );
    }
    // eslint-disable-next-line
  }, [editRef]);
  /**
   * 编辑器退出时,使用 editor 的方法注销编辑器
   * */
  React.useEffect(() => {
    return () => {
      edit?.dispose();
    };
  }, [edit]);
  /**
   * props.readonly 改变时修改编辑器的只读属性
   * */
  React.useEffect(() => {
    edit?.onMouseLeave(() => {
      props.onChangeCode?.(edit?.getValue());
    });
    // eslint-disable-next-line
  }, [edit]);
  /**
   * props.code 改变时,如果 props.code和编辑器本身储存的 code 不一样,则重设编辑器的值
   * */
  React.useEffect(() => {
    if (props.code !== edit?.getValue()) {
      edit?.setValue(props.code);
    }
  }, [edit, props.code]);
  return <div className={props.className} ref={editRef} />;
}
