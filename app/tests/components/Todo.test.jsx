import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';
import * as actions from 'actions';

import { Todo } from 'Todo';

describe('Todo', () => {
  it('should exist', () => {
    expect(Todo).toExist();
  });

  it('should dispatch UPDATE_TODO on click', () => {
    const todoData = {
      id: '123',
      text: 'Write todo.test.jsx test',
      completed: false,
    }

    const spy = expect.createSpy();
    const action = actions.startToggleTodo(todoData.id, !todoData.completed);
    const todo = TestUtils.renderIntoDocument(<Todo { ...todoData } dispatch={ spy } />);
    const $el = $(ReactDOM.findDOMNode(todo));

    TestUtils.Simulate.click($el[0]);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
