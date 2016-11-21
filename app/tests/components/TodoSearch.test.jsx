import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import { TodoSearch } from 'TodoSearch';

describe('TodoSearch', () => {
  it('should exist', () => {
    const todoSearch = TestUtils.renderIntoDocument(<TodoSearch />);
    expect(todoSearch).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT on input change', () => {
    const searchText = 'Hello World';
    const action = {
      type: 'SET_SEARCH_TEXT',
      searchText
    };

    const spy = expect.createSpy();
    const todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={ spy } />);
    const $el = $(ReactDOM.findDOMNode(todoSearch));
    const input = $el.find('input[name="searchText"]')[0];

    input.value = searchText;
    TestUtils.Simulate.change(input);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch TOGGLE_SHOW_COMPLETED when the ckeckbox is ticked', () => {
    const action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    const spy = expect.createSpy();
    const todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={ spy } />);
    const $el = $(ReactDOM.findDOMNode(todoSearch));
    const checkbox = $el.find('input[name="showCompleted"]')[0];

    checkbox.checked = 'checked';
    TestUtils.Simulate.change(checkbox);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
