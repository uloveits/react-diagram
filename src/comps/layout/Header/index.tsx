import React from 'react';
import { Breadcrumb } from 'antd';

const MyHeader = () => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', height: '64px', lineHeight: '64px' }}>
        <div style={{ paddingLeft: '10px' }}>
          <Breadcrumb>
            <Breadcrumb.Item>
              首页
            </Breadcrumb.Item>
            <Breadcrumb.Item>json</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </>
  );
};
export default MyHeader;
