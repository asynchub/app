import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginForm from './components/login-form';
import Engineer from './components/engineer';
import Purchase from './components/purchase';
import Plan from './components/plan';
import Manage from './components/manage';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/engineer' component={Engineer} />
          <Route path='/purchase' component={Purchase} />
          <Route path='/plan' component={Plan} />
          <Route path='/manage' component={Manage} />
          <Route path='/' component={LoginForm} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>
  , document.querySelector('.container'));
