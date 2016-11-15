var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');
var expect = require('expect');

import {TranslationSearch} from 'TranslationSearch';

describe('TranslationSearch', () => {
  it('should exist', () => {
    var translationSearch = TestUtils.renderIntoDocument(<TranslationSearch />);
    expect(TranslationSearch).toExist();
  });

  it('should dispatch SET_SEARCH_TEXT on input change', () => {
    var searchText = 'Hello World';
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText
    };

    var spy = expect.createSpy();
    var translationSearch = TestUtils.renderIntoDocument(<TranslationSearch dispatch={spy}/>);
    var $el = $(ReactDOM.findDOMNode(translationSearch));
    var input = $el.find('input[name="searchText"]')[0];


    input.value = searchText;
    TestUtils.Simulate.change(input);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
