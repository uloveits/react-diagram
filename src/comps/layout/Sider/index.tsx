import React from 'react';
import logo from '@/public/img/logo.png';
import MyMenu from '../Menu';
import './index.less';

const MySider = () => {
  return (
    <>
      {/* logo部分 */}
      <div className="my-sider-logo">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img style={{ width: '35px', height: '35px' }} src={logo} alt="logo" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ color: '#fff', fontSize: '12px' }}>一根网线丶</div>
        </div>
      </div>
      {/* 菜单部分 */}
      <div>
        <MyMenu />
      </div>
    </>
  );
};

export default MySider;
