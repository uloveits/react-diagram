import React from 'react';
import { Layout, Spin } from 'antd';
import MyHeader from '../Header';
import './index.less';

import MySider from '../Sider';

const { Header, Content, Footer, Sider } = Layout;

interface IBaseLayoutProps {
  children: React.ReactNode;
}
const BaseLayout = (props: IBaseLayoutProps) => {
  const { children } = props;

  return (
    <Layout className="my-layout">
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          zIndex: 100,
        }}
      >
        <MySider />
      </Sider>
      <Layout style={{ marginLeft: '90px' }}>
        <Header
          style={{
            background: '#fff',
            boxShadow: '0 0 18px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <MyHeader />
        </Header>
        <Content style={{ padding: '10px' }}>
          <div className="site-layout-content">
            <React.Suspense fallback={<Spin delay={200} className="global-spin" />}>{children}</React.Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Base-app ©2020 Created by uloveits</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
