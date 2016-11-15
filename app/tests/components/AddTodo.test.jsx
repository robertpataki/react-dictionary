const React = require('react');
const ReactDOM = require('react-dom');

const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');


var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch ADD_TODO when valid todo text', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Adding a new todo'
    }

    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);

    var $el = $(ReactDOM.findDOMNode(addTodo));
    var formEl = $($el.find('form'))[0];
    var todoInput = $(formEl).find('input')[0];

    todoInput.value = action.text;

    TestUtils.Simulate.submit(formEl);

    expect(todoInput.value).toBe('');
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not call ADD_TODO with an invalid todo text', () => {
    var spy = expect.createSpy();
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);

    var $el = $(ReactDOM.findDOMNode(addTodo));
    var formEl = $($el.find('form'))[0];
    var todoInput = $(formEl).find('input')[0];

    var todoText = '';
    todoInput.value = todoText;

    TestUtils.Simulate.submit(formEl);

    expect(todoInput.value).toBe('');
    expect(spy).toNotHaveBeenCalled();
  });
});
