import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import * as configureStore from 'configureStore';
import * as actions from 'actions';
import firebase from 'app/firebase/';
import router from 'app/router/';

const BREWSER = require('brewser').BREWSER;

// Authentication state based redirects
firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(actions.login(user.uid, user.displayName, user.photoURL));
    store.dispatch(actions.startAddTranslations());
    browserHistory.push('/dictionary');
  } else {
    browserHistory.push('/');
    store.dispatch(actions.logout());
  }
});

// App css
require('style!css!sass!applicationStyles');

// Redux Store setup
const store = configureStore.configure();

if(BREWSER.device.touch) {
  document.querySelector('html').className += ' is-touch';

  // Disable pinch zoom in the app to fix iOS layout breaks
  document.addEventListener('gesturestart', function (e) { e.preventDefault(); 'Fuck Apple.'});
}

ReactDOM.render(
  <Provider store={ store }>
    { router }
  </Provider>,
  document.getElementById('app')
);
