import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import Home from '../pages/home';
import BaseLayout from '../comps/layout/Baselayout';

const history = createHashHistory();

const RouterConfig = () => {
  return (
    <BaseLayout>
      <Router history={history}>
        <Switch>
          Home
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </BaseLayout>
  );
};
export default RouterConfig;
