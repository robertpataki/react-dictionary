import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import { SearchBar } from 'SearchBar';
import * as actionTypes from 'actionTypes';

describe('SearchBar', () => {
  it('should exist', () => {
    const searchBar = TestUtils.renderIntoDocument(<SearchBar />);
    expect(searchBar).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT on input change', () => {
    const searchText = 'Hello World';
    const action = {
      type: actionTypes.SET_SEARCH_TEXT,
      searchText
    };

    const spy = expect.createSpy();
    const searchBar = TestUtils.renderIntoDocument(<SearchBar dispatch={ spy } />);
    const $el = $(ReactDOM.findDOMNode(searchBar));
    const input = $el.find('input[name="searchText"]')[0];

    input.value = searchText;
    TestUtils.Simulate.change(input);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('X button should reset searchText and dispatch SET_SEARCH_TEXT', () => {
    const action = {
      type: actionTypes.SET_SEARCH_TEXT,
      searchText: '',
    };

    const spy = expect.createSpy();
    const searchBar = TestUtils.renderIntoDocument(<SearchBar dispatch={ spy } />);
    const $el = $(ReactDOM.findDOMNode(searchBar));
    const button = $el.find('.search-bar__icon--close')[0];

    TestUtils.Simulate.click(button);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
