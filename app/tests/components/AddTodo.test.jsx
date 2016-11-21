import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';
import * as actions from 'actions';

const { AddTodo } = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch ADD_TODO when valid todo text', () => {
    const todoText = 'Adding a new todo'
    const action = actions.startAddTodo(todoText);

    const spy = expect.createSpy();
    const addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={ spy } />);

    const $el = $(ReactDOM.findDOMNode(addTodo));
    const formEl = $($el.find('form'))[0];
    const todoInput = $(formEl).find('input')[0];

    todoInput.value = action.text;
    TestUtils.Simulate.submit(formEl);

    expect(todoInput.value).toBe('');
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not call ADD_TODO with an invalid todo text', () => {
    const spy = expect.createSpy();
    const addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={ spy } />);

    const $el = $(ReactDOM.findDOMNode(addTodo));
    const formEl = $($el.find('form'))[0];
    const todoInput = $(formEl).find('input')[0];

    const todoText = '';
    todoInput.value = todoText;

    TestUtils.Simulate.submit(formEl);

    expect(todoInput.value).toBe('');
    expect(spy).toNotHaveBeenCalled();
  });
});
