import React from 'react';
import ReactDOM from 'react-dom';

import TestUtilsAdditions from 'react-testutils-additions';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import SlideButtons from 'SlideButtons';
import { TranslationInputSlide } from 'TranslationInputSlide';

describe('TranslationInputSlide', () => {
  it('should exist', () => {
    expect(TranslationInputSlide).toExist();
  });

  describe('props', () => {
    it('should render `title` prop', () => {
      const slideTitle = 'Title of the slide';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide title={ slideTitle } />);
      const title = TestUtils.findRenderedDOMComponentWithClass(translationInputSlide, 'slide__title');
      const expected = slideTitle;
      const actual = title.textContent;
      expect(actual).toEqual(expected);
    });
  });

  describe('User interaction via buttons', () => {
    it('should bypass the button clicks to the prop event handlers', () => {
      const spy = expect.createSpy();
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide />);
      const slideButtons = TestUtils.findRenderedComponentWithType(translationInputSlide, SlideButtons);
      expect(slideButtons.props.onLeftButtonSelect).toBe(translationInputSlide.props.onLeftButtonSelect);
      expect(slideButtons.props.onRightButtonSelect).toBe(translationInputSlide.props.onRightButtonSelect);
    });

    it('should disable the right hand button when the input field is empty', () => {
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide />);
      const slideButtons = TestUtils.findRenderedComponentWithType(translationInputSlide, SlideButtons);
      expect(slideButtons.props.rightButtonDisabled).toEqual(true);
    });
  });

  describe('input field', () => {
    it('should render `inputValue` prop as value of the input field', () => {
      const defaultValue = 'Boo Far';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue={ defaultValue } />);
      const inputField = TestUtils.findRenderedDOMComponentWithTag(translationInputSlide, 'input');

      const actual = inputField.value;
      const expected = defaultValue;
      expect(actual).toEqual(expected);
    });

    it('should dispatch event when selected', () => {
      const spy = expect.createSpy();
      const defaultValue = 'Hell';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue={ defaultValue } onChange={ spy } />);
      const inputField = TestUtils.findRenderedDOMComponentWithTag(translationInputSlide, 'input');

      inputField.value += 'o';
      TestUtils.Simulate.change(inputField);
      expect(spy).toHaveBeenCalledWith('Hello');
    });
  });

  describe('Keyboard controls', () => {
    it('should handle the ENTER key to select the right button with valid input', () => {
      const spy = expect.createSpy();
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue="Foo" onRightButtonSelect={ spy } />);
      const wrapper = TestUtils.scryRenderedDOMComponentsWithTag(translationInputSlide, 'div')[0];

      TestUtils.Simulate.keyUp(wrapper, {key: 'Enter'});
      expect(spy).toHaveBeenCalled();
    });

    it('should ignore the ENTER key with empty input', () => {
      const spy = expect.createSpy();
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue="" onRightButtonSelect={ spy } />);
      const wrapper = TestUtils.scryRenderedDOMComponentsWithTag(translationInputSlide, 'div')[0];

      TestUtils.Simulate.keyUp(wrapper, {key: 'Enter'});
      expect(spy).toNotHaveBeenCalled();
    });

    it('should handle the ESCAPE key to select the left button', () => {
      const spy = expect.createSpy();
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide onLeftButtonSelect={ spy } />);
      const wrapper = TestUtils.scryRenderedDOMComponentsWithTag(translationInputSlide, 'div')[0];

      TestUtils.Simulate.keyUp(wrapper, {key: 'Escape'});
      expect(spy).toHaveBeenCalled();
    });
  });
});
