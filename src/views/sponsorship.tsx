import React from 'react';
import alipay from '../assets/alipay.jpg';
import wepay from '../assets/wepay.jpg';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Alipay from '../components/common/icon/alipay';
import WePay from '../components/common/icon/wepay';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MyTabs from '../components/myTabs';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'relative',
      height: '100%',
    },
    img: {
      maxHeight: '80%',
      maxWidth: '50%',
    },
    page: {
      overflow: 'hidden',
    },
  }),
);
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 支持页面
 * */
export default function Sponsorship(): JSX.Element {
  /**
   * 显示的二维码图片
   * */
  const [imgSrc, setImgSrc] = React.useState<string>(alipay);
  const style = useStyle();
  return (
    <MyTabs className={style.page}>
      <div className={style.main}>
        <img src={imgSrc} className={style.img} alt={'二维码'} />
        {/* 切换二维码按钮 */}
        <ToggleButtonGroup
          exclusive
          value={imgSrc}
          onChange={(event, value) => {
            if (value !== null) {
              setImgSrc(value);
            }
          }}
        >
          <ToggleButton value={alipay}>
            <Alipay />
          </ToggleButton>
          <ToggleButton value={wepay}>
            <WePay />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </MyTabs>
  );
}
