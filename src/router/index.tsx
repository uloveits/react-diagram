import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import Home from '../pages/home';
import SqlEdit from '../pages/sqlEdit';
import BaseLayout from '../comps/layout/Baselayout';

const history = createHashHistory();

const RouterConfig = () => {
  return (
    <BaseLayout>
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/sqlEdit" />} />
          <Route path="/home" component={Home} />
          <Route path="/sqlEdit" component={SqlEdit} />
        </Switch>
      </Router>
    </BaseLayout>
  );
};
export default RouterConfig;
