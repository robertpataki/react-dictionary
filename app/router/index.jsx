import React from 'react';
import firebase from 'app/firebase/';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import Main from 'Main';
import TodoApp from 'TodoApp';
import Login from 'Login';

// Middleware
const requireLogin = (nextState, replace, next) => {
  if(!firebase.auth().currentUser) {
    replace('/');
  }
  next();
};

const redirectIfLoggedIn = (nextState, replace, next) => {
  if(firebase.auth().currentUser) {
    replace('/todos');
  }
  next();
};

export default (
  <Router history={ browserHistory }>
    <Route path="/" component={ Main }>
      <IndexRoute component={ Login } onEnter={ redirectIfLoggedIn } />
      <Route path="todos" component={ TodoApp } onEnter={ requireLogin } />
    </Route>
  </Router>
);
