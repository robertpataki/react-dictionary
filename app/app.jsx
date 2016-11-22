import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import * as configureStore from 'configureStore';
import * as actions from 'actions';
import firebase from 'app/firebase/';
import router from 'app/router/';

// Authentication state based redirects
firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(actions.login(user.uid, user.displayName, user.photoURL));
    store.dispatch(actions.startAddTodos());
    browserHistory.push('/todos');
  } else {
    browserHistory.push('/');
    store.dispatch(actions.logout());
  }
});

// Load Foundation
$(document).foundation();
// App css
require('style!css!sass!applicationStyles');

// Redux Store setup
const store = configureStore.configure();

ReactDOM.render(
  <Provider store={ store }>
    { router }
  </Provider>,
  document.getElementById('app')
);
