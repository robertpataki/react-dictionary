import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery';

import { TranslationInputSlide } from 'TranslationInputSlide';

describe('TranslationInputSlide', () => {
  it('should exist', () => {
    expect(TranslationInputSlide).toExist();
  });

  describe('props', () => {
    it('should render `title` prop', () => {
      const slideTitle = 'Title of the slide';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide title={ slideTitle } />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const $title = $wrapper.find(":contains('" + slideTitle + "')");
      const actual = $title.length;
      const expected = 1;

      expect(actual).toBe(expected);
    });
  });

  describe('left button', () => {
    it('should render `leftButtonLabel` prop', () => {
      const buttonLabel = 'Left Button Label';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide leftButtonLabel={ buttonLabel } />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const $leftButton = $wrapper.find("button:contains('" + buttonLabel + "')");

      const actual = $leftButton.length;
      const expected = 1;
      expect(actual).toEqual(expected);
    });

    it('should dispatch event when selected', () => {
      const spy = expect.createSpy();
      const buttonLabel = 'Left Button Label';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide leftButtonLabel={ buttonLabel } onLeftButtonSelect={ spy } />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const leftButton = $wrapper.find("button:contains('" + buttonLabel + "')")[0];

      TestUtils.Simulate.click(leftButton);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('right button', () => {
    it('should render `rightButtonLabel` prop', () => {
      const buttonLabel = 'Right Button Label';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide rightButtonLabel={ buttonLabel } />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const $rightButton = $wrapper.find("button:contains('" + buttonLabel + "')");

      const actual = $rightButton.length;
      const expected = 1;
      expect(actual).toEqual(expected);
    });

    it('should dispatch event when selected', () => {
      const spy = expect.createSpy();
      const buttonLabel = 'Right Button Label';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide rightButtonLabel={ buttonLabel } onRightButtonSelect={ spy } />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const rightButton = $wrapper.find("button:contains('" + buttonLabel + "')")[0];

      TestUtils.Simulate.click(rightButton);
      expect(spy).toHaveBeenCalled();
    });

    it('should not dispatch event when selected but the input field is empty', () => {
      const spy = expect.createSpy();
      const buttonLabel = 'Right Button Label';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide rightButtonLabel={ buttonLabel } onRightButtonSelect={ spy } inputValue="" />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const input = $wrapper.find('input');
      const rightButton = $wrapper.find("button:contains('" + buttonLabel + "')")[0];

      TestUtils.Simulate.click(rightButton);
      expect(spy).toNotHaveBeenCalled();
    });
  });

  describe('input field', () => {
    it('should render `inputValue` prop as value of the input field', () => {
      const defaultValue = 'Boo Far';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue={ defaultValue } />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const inputField = $wrapper.find('input')[0];

      const actual = inputField.value;
      const expected = defaultValue;
      expect(actual).toEqual(expected);
    });

    it('should dispatch event when selected', () => {
      const spy = expect.createSpy();
      const defaultValue = 'Hell';
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue={ defaultValue } onChange={ spy } />);
      const $wrapper = $(ReactDOM.findDOMNode(translationInputSlide));
      const inputField = $wrapper.find('input')[0];

      inputField.value += 'o';
      TestUtils.Simulate.change(inputField);
      expect(spy).toHaveBeenCalledWith('Hello');
    });
  });

  describe('Keyboard controls', () => {
    it('should handle the ENTER key to select the right button with valid input', () => {
      const spy = expect.createSpy();
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue="Foo" onRightButtonSelect={ spy } />);
      const wrapper = $(ReactDOM.findDOMNode(translationInputSlide))[0];

      TestUtils.Simulate.keyUp(wrapper, {key: 'Enter'});
      expect(spy).toHaveBeenCalled();
    });

    it('should ignore the ENTER key with empty input', () => {
      const spy = expect.createSpy();
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide inputValue="" onRightButtonSelect={ spy } />);
      const wrapper = $(ReactDOM.findDOMNode(translationInputSlide))[0];

      TestUtils.Simulate.keyUp(wrapper, {key: 'Enter'});
      expect(spy).toNotHaveBeenCalled();
    });

    it('should handle the ESCAPE key to select the left button', () => {
      const spy = expect.createSpy();
      const translationInputSlide = TestUtils.renderIntoDocument(<TranslationInputSlide onLeftButtonSelect={ spy } />);
      const wrapper = $(ReactDOM.findDOMNode(translationInputSlide))[0];

      TestUtils.Simulate.keyUp(wrapper, {key: 'Escape'});
      expect(spy).toHaveBeenCalled();
    });
  });
});
