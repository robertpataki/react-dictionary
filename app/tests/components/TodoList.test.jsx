const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');

import {configure} from 'configureStore';
// Super duper ES6 import to fetch both Raw and Reduxed TodoList modules
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render 1 todo component for each Todo item', () => {
    var todos = [
      {
        id: 1,
        text: 'Todo #1',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      }, {
        id: 2,
        text: 'Todo #2',
        completed: false,
        completedAt: undefined,
        createdAt: 500
      }
    ];

    var store = configure({
      todos
    });

    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList />
      </Provider>
    );
    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

    expect(todoComponents.length).toBe(todos.length);
  });

  it('should render a message when there are no to dos', () => {
    var todos = [];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    var $el = $(ReactDOM.findDOMNode(todoList));
    var $message = $el.find('.container__message');

    expect($message.length).toBe(1);
  });
});
