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
        <ConnectedDictionary />
      </Provider>
    );
    const dictionary = TestUtils.scryRenderedComponentsWithType(provider, ConnectedDictionary)[0];
    const translationComponents = TestUtils.scryRenderedComponentsWithType(dictionary, ConnectedTranslation);

    expect(translationComponents.length).toBe(translations.length);
  });

  it('should render a message when there are no to dos', () => {
    const translations = [];
    const dictionary = TestUtils.renderIntoDocument(<Dictionary translations={ translations } />);
    const $el = $(ReactDOM.findDOMNode(dictionary));
    const $message = $el.find(".translations--empty p");
    expect($message.length).toBe(1);
  });
});
