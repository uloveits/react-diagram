import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import MyHeader from '../Header';
import './index.less';

import DynamicPortsPage from '../../../pages/dynamicPorts';
import ProcessFlowPage from '../../../pages/processFlow';
import SqlEditPage from '../../../pages/sqlEdit';
import JsonViewPage from '../../../pages/jsonView';

const { Header, Content, Footer } = Layout;

interface IBaseLayoutProps {
  // children: React.ReactNode;
}
const BaseLayout = (props: IBaseLayoutProps) => {
  // const { children } = props;

  return (
    <Layout className="my-layout">
      <Header>
        <MyHeader />
      </Header>
      <Content style={{ padding: '10px' }}>
        <div className="site-layout-content">
          <Switch>
            <Redirect exact from="/" to="/jsonView" />
            <Route path="/dynamicPorts" exact component={DynamicPortsPage} />
            <Route path="/processFlow" exact component={ProcessFlowPage} />
            <Route path="/sqlEdit" exact component={SqlEditPage} />
            <Route path="/jsonView" exact component={JsonViewPage} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Base-app ©2020 Created by uloveits</Footer>
    </Layout>
  );
};

export default BaseLayout;
