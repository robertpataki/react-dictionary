const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const TodoApp = require('TodoApp');

const actions = require('actions');
const store = require('configureStore').configure();
const TodoAPI = require('TodoAPI');

// Load Foundation
$(document).foundation();

store.subscribe(() => {
  var state = store.getState();
  TodoAPI.setTodos(state.todos);

  console.log('New state: ', state);
})

var initialTodos = TodoAPI.getTodos();
console.log(initialTodos);
store.dispatch(actions.addTodos(initialTodos));

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
