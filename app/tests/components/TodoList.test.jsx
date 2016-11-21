import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import * as configureStore from 'configureStore';
import ConnectedTodoList, { TodoList } from 'TodoList';
import ConnectedTodo, { Todo } from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render 1 todo component for each Todo item', () => {
    const todos = [
      {
        id: 1,
        text: 'Todo #1',
        completed: false,
        completedAt: undefined,
        createdAt: 500,
      }, {
        id: 2,
        text: 'Todo #2',
        completed: false,
        completedAt: undefined,
        createdAt: 500,
      }
    ];

    const store = configureStore.configure({
      todos,
    });

    const provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList />
      </Provider>
    );
    const todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    const todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

    expect(todoComponents.length).toBe(todos.length);
  });

  it('should render a message when there are no to dos', () => {
    const todos = [];
    const todoList = TestUtils.renderIntoDocument(<TodoList todos={ todos } />);
    const $el = $(ReactDOM.findDOMNode(todoList));
    const $message = $el.find('.container__message');

    expect($message.length).toBe(1);
  });
});
