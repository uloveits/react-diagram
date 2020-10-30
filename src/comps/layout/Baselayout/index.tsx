import React from 'react';
import { Layout } from 'antd';
import MyHeader from '../Header';
import './index.less';


const { Header, Content, Footer } = Layout;

interface IBaseLayoutProps {
  children: React.ReactNode;
}
const BaseLayout = (props: IBaseLayoutProps) => {
  const { children } = props;
  return (
    <Layout className="layout">
      <Header>
        <MyHeader />
      </Header>
      <Content style={{ padding: '10px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Base-app ©2020 Created by uloveits</Footer>
    </Layout>
  );
};

export default BaseLayout;
