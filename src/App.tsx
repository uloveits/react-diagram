import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { stores, StoresContext } from './stores';

import RouterConfig from './router';
import './App.less';

const App = () => {
  return (
    <div className="App">
      <Provider {...stores}>
        <StoresContext.Provider value={stores}>
          <RouterConfig />
        </StoresContext.Provider>
      </Provider>
    </div>
  );
};

export default hot(module)(App);
