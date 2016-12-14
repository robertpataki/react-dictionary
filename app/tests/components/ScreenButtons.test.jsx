import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import ScreenButtons from 'ScreenButtons';

describe('ScreenButtons', () => {
  it('should exist', () => {
    expect(ScreenButtons).toExist();
  });

  it('should have a left and a right button', () => {
    const screenButtons = TestUtils.renderIntoDocument(<ScreenButtons leftButtonLabel="Leftie" rightButtonLabel="Rightie" />);

    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(screenButtons, 'button');
    const leftButton = buttons[0];
    const rightButton = buttons[1];

    expect(leftButton.textContent).toEqual('Leftie');
    expect(rightButton.textContent).toEqual('Rightie');
  });

  describe('Left button', () => {
    it('should call a callback when clicked', () => {
      const spy = expect.createSpy();
      const screenButtons = TestUtils.renderIntoDocument(<ScreenButtons onLeftButtonSelect={ spy } />);

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(screenButtons, 'button');
      const leftButton = buttons[0];

      TestUtils.Simulate.click(leftButton);

      expect(spy).toHaveBeenCalled();
    });

    it('should be disabled when told to be', () => {
      const spy = expect.createSpy();
      const screenButtons = TestUtils.renderIntoDocument(<ScreenButtons leftButtonDisabled={ true } />);

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(screenButtons, 'button');
      const leftButton = buttons[0];

      expect(leftButton.disabled).toEqual(true);
    });
  });

  describe('Right button', () => {
    it('should call a callback when clicked', () => {
      const spy = expect.createSpy();
      const screenButtons = TestUtils.renderIntoDocument(<ScreenButtons onRightButtonSelect={ spy } />);

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(screenButtons, 'button');
      const rightButton = buttons[1];

      TestUtils.Simulate.click(rightButton);

      expect(spy).toHaveBeenCalled();
    });
  });
});
