import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import { TranslationSearch } from 'TranslationSearch';
import * as actionTypes from 'actionTypes';

describe('TranslationSearch', () => {
  it('should exist', () => {
    const translationSearch = TestUtils.renderIntoDocument(<TranslationSearch />);
    expect(translationSearch).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT on input change', () => {
    const searchText = 'Hello World';
    const action = {
      type: actionTypes.SET_SEARCH_TEXT,
      searchText
    };

    const spy = expect.createSpy();
    const translationSearch = TestUtils.renderIntoDocument(<TranslationSearch dispatch={ spy } />);
    const $el = $(ReactDOM.findDOMNode(translationSearch));
    const input = $el.find('input[name="searchText"]')[0];

    input.value = searchText;
    TestUtils.Simulate.change(input);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
