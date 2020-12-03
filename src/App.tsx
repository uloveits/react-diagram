import React from 'react';
import { hot } from 'react-hot-loader';
import RouterConfig from './router';
import './App.less';


const App = () => {
  return (
    <div className="App">
      <RouterConfig />
    </div>
  );
};

export default hot(module)(App);
