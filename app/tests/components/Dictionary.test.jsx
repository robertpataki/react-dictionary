import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import * as configureStore from 'configureStore';
import ConnectedDictionary, { Dictionary } from 'Dictionary';
import ConnectedTranslation, { Translation } from 'Translation';

describe('Dictionary', () => {
  it('should exist', () => {
    expect(Dictionary).toExist();
  });

  it('should render 1 Translation component for each translation entry', () => {
    const translations = [
      {
        id: '123abc',
        expression: 'szó',
        meaning: 'word',
        createdAt: 100,
      }, {
        id: '234bcd',
        expression: 'mondat',
        meaning: 'sentence',
        createdAt: 200,
      },
    ];

    const store = configureStore.configure({
      translations,
    });

    const provider = TestUtils.renderIntoDocument(
      <Provider store={ store }>
        <ConnectedDictionary filteredTranslations={ translations } />
      </Provider>
    );
    const dictionary = TestUtils.scryRenderedComponentsWithType(provider, ConnectedDictionary)[0];
    const translationComponents = TestUtils.scryRenderedComponentsWithType(dictionary, ConnectedTranslation);

    expect(translationComponents.length).toBe(translations.length);
  });

  it('should render a message when there are no translations', () => {
    const translations = [];
    const dictionary = TestUtils.renderIntoDocument(<Dictionary translations={ translations } />);
    const $el = $(ReactDOM.findDOMNode(dictionary));
    const $message = $el.find("[data-message-type='no-translations']");
    expect($message.length).toBe(1);
  });

  it('should render a warning when there are translations, but the search didn\'t bring any results', () => {
    const translations = [{
      id: '123abc',
      expression: 'szó',
      meaning: 'word',
      createdAt: 100,
    }];
    const store = configureStore.configure({
      translations,
      searchText: 'blahblah'
    });

    const provider = TestUtils.renderIntoDocument(
      <Provider store={ store }>
        <ConnectedDictionary filteredTranslations={ [] } />
      </Provider>
    );

    const dictionary = TestUtils.scryRenderedComponentsWithType(provider, ConnectedDictionary)[0];
    const $el = $(ReactDOM.findDOMNode(dictionary));
    const $message = $el.find("[data-message-type='no-search-results']");
    expect($message.length).toBe(1);
  });
});
