import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import moment from 'moment';
import $ from 'jquery';

import * as configureStore from 'configureStore';
import { DictionaryApp } from 'DictionaryApp';
import TodoList from 'TodoList';


describe('DictionaryApp', () => {
  it('should exist', () => {
    expect(DictionaryApp).toExist();
  });

  it('should render TodoList', () => {
    const authData = {
      uid: '123abc',
      name: 'Dwayne \'The Rock\' Johnson',
      pic: 'http://img.wennermedia.com/480-width/1405624408_the-rock-zoom.jpg',
    };
    const store = configureStore.configure({ auth: authData });
    const provider = TestUtils.renderIntoDocument(
      <Provider store={ store }>
        <DictionaryApp />
      </Provider>
    );

    const dictionaryApp = TestUtils.scryRenderedComponentsWithType(provider, DictionaryApp)[0];
    const todoList = TestUtils.scryRenderedComponentsWithType(dictionaryApp, TodoList);

    expect(todoList.length).toEqual(1);
  });
});
