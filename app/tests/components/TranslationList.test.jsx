const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');

const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');

import {configure} from 'configureStore';
// Super duper ES6 import to fetch both Raw and Reduxed TranslationList modules
import ConnectedTranslationList, {TranslationList} from 'TranslationList';
import ConnectedTranslation, {Translation} from 'Translation';

describe('TranslationList', () => {
  it('should exist', () => {
    expect(TranslationList).toExist();
  });

  it('should render 1 translation component for each Translation item', () => {
    var translations = [
      {
        id: '1-2-3-4',
        expression: 'szia',
        meaning: 'hi',
        createdAt: 500,
      }, {
        id: '2-3-4-5',
        expression: 'haver',
        meaning: 'pal',
        createdAt: 500
      }
    ];

    var store = configure({
      translations
    });

    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTranslationList />
      </Provider>
    );
    var translationList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTranslationList)[0];
    var translationComponents = TestUtils.scryRenderedComponentsWithType(translationList, ConnectedTranslation);

    expect(translationComponents.length).toBe(translations.length);
  });

  it('should render a message when there are no to dos', () => {
    var translations = [];
    var translationList = TestUtils.renderIntoDocument(<TranslationList translations={translations}/>);
    var $el = $(ReactDOM.findDOMNode(translationList));
    var $message = $el.find('.container__message');

    expect($message.length).toBe(1);
  });
});
