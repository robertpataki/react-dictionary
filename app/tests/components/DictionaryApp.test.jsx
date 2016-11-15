const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');

const configureStore = require('configureStore');
const DictionaryApp = require('DictionaryApp');

import TranslationList from 'TranslationList';


describe('DictionaryApp', () => {
  it('should exist', () => {
    expect(DictionaryApp).toExist();
  });

  it('should render TranslationList', () => {
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <DictionaryApp />
      </Provider>
    );

    var dictionaryApp = TestUtils.scryRenderedComponentsWithType(provider, DictionaryApp)[0];
    var translationList = TestUtils.scryRenderedComponentsWithType(dictionaryApp, TranslationList);

    expect(translationList.length).toEqual(1);
  });
});
