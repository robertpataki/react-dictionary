import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import SlideButtons from 'SlideButtons';

describe('SlideButtons', () => {
  it('should exist', () => {
    expect(SlideButtons).toExist();
  });

  it('should have a left and a right button', () => {
    const slideButtons = TestUtils.renderIntoDocument(<SlideButtons leftButtonLabel="Leftie" rightButtonLabel="Rightie" />);

    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(slideButtons, 'button');
    const leftButton = buttons[0];
    const rightButton = buttons[1];

    expect(leftButton.textContent).toEqual('Leftie');
    expect(rightButton.textContent).toEqual('Rightie');
  });

  describe('Left button', () => {
    it('should call a callback when clicked', () => {
      const spy = expect.createSpy();
      const slideButtons = TestUtils.renderIntoDocument(<SlideButtons onLeftButtonSelect={ spy } />);

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(slideButtons, 'button');
      const leftButton = buttons[0];

      TestUtils.Simulate.click(leftButton);

      expect(spy).toHaveBeenCalled();
    });

    it('should be disabled when told to be', () => {
      const spy = expect.createSpy();
      const slideButtons = TestUtils.renderIntoDocument(<SlideButtons leftButtonDisabled={ true } />);

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(slideButtons, 'button');
      const leftButton = buttons[0];

      expect(leftButton.disabled).toEqual(true);
    });
  });

  describe('Right button', () => {
    it('should call a callback when clicked', () => {
      const spy = expect.createSpy();
      const slideButtons = TestUtils.renderIntoDocument(<SlideButtons onRightButtonSelect={ spy } />);

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(slideButtons, 'button');
      const rightButton = buttons[1];

      TestUtils.Simulate.click(rightButton);

      expect(spy).toHaveBeenCalled();
    });
  });
});
