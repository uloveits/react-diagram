import React from 'react';
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { createHashHistory } from 'history';
import { StaticContext } from 'react-router';
import BaseLayout from '../comps/layout/Baselayout';


const history = createHashHistory();

const RouterConfig = () => {
  /**
   * 跳转路由前触发
   * @param Component 
   * @param props 
   */
  const onEnter = (Component: any, props: RouteComponentProps<any, StaticContext, unknown>) => {
    console.log('跳转路由前触发');
    console.log(Component);
    console.log(props);
    return <Component {...props} />;
  };

  return (
    <Router history={history}>
      <Route
        render={() => {
          return (
            <Switch>
              <Route path="/" render={(props) => onEnter(BaseLayout, props)} />
            </Switch>
          );
        }}
      />
    </Router>
  );
};
export default RouterConfig;
