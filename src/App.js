import React from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Signup from './containers/signup';
import Signin from './containers/signin';
import configureStore from './store';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './App.css';
import setAuthToken from './utills/setAuthToken';
import jwt_decode from 'jwt-decode';
import * as types from './actions/types';
import Dashboard from './containers/dashboard';
import Main from './containers/main';
import Profile from './components/profile';
import Restaurants from './components/restaurants';

const store = configureStore()

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  store.dispatch({ type: types.SET_CURRENT_USER, payload: decoded });
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime) {
    localStorage.removeItem('token');
    setAuthToken(false);
    store.dispatch({ type: types.SET_CURRENT_USER, payload: {} });
    window.location.href = '/signin';
  }
}

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path={`/`} component={Main} />
            <Route exact path={`/signup`} component={Signup} />
            <Route exact path={`/signin`} component={Signin} />
            <Route exact path={`/profile`} component={Profile}/>
            <Route exact path={`/restaurants`} component={Restaurants}/>
            <Route path={`/dashboard`} component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
