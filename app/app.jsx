const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const DictionaryApp = require('DictionaryApp');

const actions = require('actions');
const store = require('configureStore').configure();
const TranslationAPI = require('TranslationAPI');

// Load Foundation
$(document).foundation();

store.subscribe(() => {
  var state = store.getState();
  TranslationAPI.setTranslations(state.translations);

  console.log('New state: ', state);
})

var initialTranslations = TranslationAPI.getTranslations();
console.log(initialTranslations);
store.dispatch(actions.AddTranslations(initialTranslations));

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <DictionaryApp />
  </Provider>,
  document.getElementById('app')
);
