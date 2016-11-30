import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import * as actionTypes from 'actionTypes';
import * as actions from 'actions';
import { AddTranslation } from 'AddTranslation';

describe('AddTranslation', () => {
  it('should exist', () => {
    expect(AddTranslation).toExist();
  });

  describe('Adding a valid translation', () => {
    it('should dispatch ADD_TRANSLATION when a valid translation is passed', () => {
      const translation = {
        expression: 'kutya',
        meaning: 'dog',
      }
      const action = actions.startAddTranslation(translation.expression, translation.meaning);

      const spy = expect.createSpy();
      const addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={ spy } />);

      const $el = $(ReactDOM.findDOMNode(addTranslation));
      const expressionInput = $el.find('input')[0];
      const meaningInput = $el.find('input')[1];

      expressionInput.value = translation.expression;
      meaningInput.value = translation.meaning;

      TestUtils.Simulate.submit($el[0]);

      expect(expressionInput.value).toBe('');
      expect(meaningInput.value).toBe('');
      expect(spy).toHaveBeenCalledWith(action);
    });
  });

  describe('Trying to add an invalid translation', () => {
    it('should not dispatch ADD_TRANSLATION when the expression is invalid', () => {
      const translation = {
        meaning: 'dog',
      };

      const spy = expect.createSpy();
      const addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={ spy } />);

      const $el = $(ReactDOM.findDOMNode(addTranslation));
      const expressionInput = $el.find('input')[0];
      const meaningInput = $el.find('input')[1];

      meaningInput.value = translation.meaning;

      TestUtils.Simulate.submit($el[0]);

      expect(meaningInput.value).toBe(translation.meaning);
      expect(spy).toNotHaveBeenCalled();
    });

    it('should not dispatch ADD_TRANSLATION when the meaning is invalid', () => {
      const translation = {
        expression: 'kutya',
      };

      const spy = expect.createSpy();
      const addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={ spy } />);

      const $el = $(ReactDOM.findDOMNode(addTranslation));
      const expressionInput = $el.find('input')[0];
      const meaningInput = $el.find('input')[1];

      expressionInput.value = translation.expression;

      TestUtils.Simulate.submit($el[0]);

      expect(expressionInput.value).toBe(translation.expression);
      expect(spy).toNotHaveBeenCalled();
    });
  });
});
