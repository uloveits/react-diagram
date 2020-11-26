import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import MyHeader from '../Header';
import './index.less';

import DynamicPortsPage from '../../../pages/dynamicPorts';
import ProcessFlowPage from '../../../pages/processFlow';
import SqlEditPage from '../../../pages/sqlEdit';
import JsonViewPage from '../../../pages/jsonView';
import MySider from '../Sider';

const { Header, Content, Footer, Sider } = Layout;

interface IBaseLayoutProps {
  // children: React.ReactNode;
}
const BaseLayout = (props: IBaseLayoutProps) => {
  // const { children } = props;

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
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/diagram/dynamicPorts" exact component={DynamicPortsPage} />
              <Route path="/diagram/processFlow" exact component={ProcessFlowPage} />
              <Route path="/code/sqlEdit" exact component={SqlEditPage} />
              <Route path="/code/jsonView" exact component={JsonViewPage} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Base-app ©2020 Created by uloveits</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
