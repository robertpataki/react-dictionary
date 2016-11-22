import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import * as configureStore from 'configureStore';
import ConnectedUserBar, { UserBar } from 'UserBar';

describe('UserBar', () => {
  it('should exist', () => {
    expect(UserBar).toExist();
  });

  it('should render first name and profile picture of the user', () => {
    const authData = {
      uid: '123abc',
      name: 'Dwayne \'The Rock\' Johnson',
      pic: 'http://img.wennermedia.com/480-width/1405624408_the-rock-zoom.jpg',
    };

    const store = configureStore.configure({
      auth: authData,
    });

    const provider = TestUtils.renderIntoDocument(
      <Provider store={ store }>
        <ConnectedUserBar />
      </Provider>
    );

    const connectedUserBar = TestUtils.scryRenderedComponentsWithType(provider, ConnectedUserBar)[0];

    const $wrapper = $(ReactDOM.findDOMNode(connectedUserBar));

    // Checking for the precence of the profile picture in the DOM
    const $img = $wrapper.find('img');
    expect($img.attr('src')).toEqual(authData.pic);

    // Checking for the presence of the first name in the DOM
    const firstName = authData.name.split(' ')[0];
    const $nameField = $wrapper.find(`:contains(${firstName})`);
    expect($nameField.length).toEqual(1);
  });
});
