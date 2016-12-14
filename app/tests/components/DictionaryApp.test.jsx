import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import moment from 'moment';

import * as configureStore from 'configureStore';
import * as screenTypes from 'screenTypes';
import { DictionaryApp } from 'DictionaryApp';
import Dictionary from 'Dictionary';


describe('DictionaryApp', () => {
  it('should exist', () => {
    expect(DictionaryApp).toExist();
  });

  it('should render Dictionary', () => {
    const authData = {
      uid: '123abc',
      name: 'Dwayne \'The Rock\' Johnson',
      pic: 'http://img.wennermedia.com/480-width/1405624408_the-rock-zoom.jpg',
    };
    const store = configureStore.configure({ auth: authData });
    const provider = TestUtils.renderIntoDocument(
      <Provider store={ store }>
        <DictionaryApp screenType={{ type: screenTypes.DICTIONARY_SCREEN, options: {} }}/>
      </Provider>
    );

    const dictionaryApp = TestUtils.scryRenderedComponentsWithType(provider, DictionaryApp)[0];
    const dictionary = TestUtils.scryRenderedComponentsWithType(dictionaryApp, Dictionary);

    expect(dictionary.length).toEqual(1);
  });
});
