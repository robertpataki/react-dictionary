import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-addons-test-utils';
import TestUtilsAdditions from 'react-testutils-additions';
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
    const input = TestUtilsAdditions.findRenderedDOMComponentWithAttributeValue(
      searchBar, 'name', 'searchText');

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
    const button = TestUtils.findRenderedDOMComponentWithClass(searchBar, 'search-bar__icon--close');

    TestUtils.Simulate.click(button);

    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should clear searchText when hitting ESC', () => {
    const action = {
      type: actionTypes.SET_SEARCH_TEXT,
      searchText: '',
    };
    const spy = expect.createSpy();

    const searchBar = TestUtils.renderIntoDocument(<SearchBar dispatch={ spy } />);
    const wrapper = TestUtils.findRenderedDOMComponentWithTag(searchBar, 'div');
    const input = TestUtilsAdditions.findRenderedDOMComponentWithAttributeValue(
      searchBar, 'name', 'searchText');

    input.value = 'Searching for Foo Bar';
    TestUtils.Simulate.change(input);

    TestUtils.Simulate.keyUp(wrapper, {key: 'Escape'});

    expect(spy).toHaveBeenCalledWith(action);
  });
});
