import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import * as actions from 'actions';
import * as actionTypes from 'actionTypes';
import * as screenTypes from 'screenTypes';

import * as configureStore from 'configureStore';
import ScreenButtons from 'ScreenButtons';
import ConnectedUserScreen, { UserScreen } from 'UserScreen';

describe('UserScreen', () => {
  it('should exist', () => {
    expect(UserScreen).toExist();
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
        <ConnectedUserScreen />
      </Provider>
    );

    const connectedUserScreen = TestUtils.scryRenderedComponentsWithType(provider, ConnectedUserScreen)[0];

    // Checking for the precence of the profile picture in the DOM
    const img = TestUtils.findRenderedDOMComponentWithTag(
        connectedUserScreen, 'img'
    );
    expect(img.src).toEqual(authData.pic);

    // Checking for the presence of the first name in the DOM
    const firstName = authData.name.split(' ')[0];
    const p = TestUtils.findRenderedDOMComponentWithTag(
        connectedUserScreen, 'p'
    );
    expect(p.textContent).toContain(firstName);
  });

  describe('User interaction', () => {
    it('should close the screen', () => {
      const spy = expect.createSpy();
      const userScreen = TestUtils.renderIntoDocument(<UserScreen name="Foo Bar" pic="http://img.wennermedia.com/480-width/1405624408_the-rock-zoom.jpg" dispatch={ spy } />);
      const action = actions.setScreenType(screenTypes.DICTIONARY_SCREEN);
      userScreen.cancel();

      expect(spy).toHaveBeenCalledWith(action);
    });

    it('should call cancel() when the left button is selected and logout() when right button is selected', () => {
      const userScreen = TestUtils.renderIntoDocument(<UserScreen name="Foo Bar" pic="http://img.wennermedia.com/480-width/1405624408_the-rock-zoom.jpg" />);

      const screenButtons = TestUtils.findRenderedComponentWithType(userScreen, ScreenButtons);
      expect(screenButtons.props.onLeftButtonSelect).toBe(userScreen.cancel);
      expect(screenButtons.props.onRightButtonSelect).toBe(userScreen.logout);
    });

    it('should log the user out', () => {
      const spy = expect.createSpy();
      const userScreen = TestUtils.renderIntoDocument(<UserScreen name="Foo Bar" pic="http://img.wennermedia.com/480-width/1405624408_the-rock-zoom.jpg" dispatch={ spy } />);
      const action = actions.startLogout();
      userScreen.logout();

      expect(spy).toHaveBeenCalledWith(action);
    });
  });
});
