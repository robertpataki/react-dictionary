import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import * as actions from 'actions';
import * as actionTypes from 'actionTypes';
import * as screenTypes from 'screenTypes';

import * as configureStore from 'configureStore';
import ConnectedUserBar, { UserBar } from 'UserBar';

describe('UserBar', () => {
  it('should exist', () => {
    expect(UserBar).toExist();
  });

  it('should render profile picture of the user', () => {
    const authData = {
      uid: '123abc',
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

    // Checking for the precence of the profile picture in the DOM
    const img = TestUtils.findRenderedDOMComponentWithTag(connectedUserBar, 'img');
    expect(img.src).toEqual(authData.pic);
  });

  it('should dispatch an action to open the UserScreen', () => {
    const spy = expect.createSpy();
    const action = actions.setScreenType(screenTypes.USER_PROFILE_SCREEN);

    const userBar = TestUtils.renderIntoDocument(<UserBar pic="http://placekitten.com/g/200/300" dispatch={ spy }/>);
    const img = TestUtils.findRenderedDOMComponentWithTag(userBar, 'img');

    TestUtils.Simulate.click(img);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
