var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');
var expect = require('expect');

import {TodoSearch} from 'TodoSearch';

describe('TodoSearch', () => {
  it('should exist', () => {
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch />);
    expect(todoSearch).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT on input change', () => {
    var searchText = 'Hello World';
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText
    };

    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(todoSearch));
    var input = $el.find('input[name="searchText"]')[0];


    input.value = searchText;
    TestUtils.Simulate.change(input);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch TOGGLE_SHOW_COMPLETED when the ckeckbox is ticked', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var spy = expect.createSpy();
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(todoSearch));
    var checkbox = $el.find('input[name="showCompleted"]')[0];

    checkbox.checked = 'checked';
    TestUtils.Simulate.change(checkbox);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
