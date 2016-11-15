const React = require('react');
const ReactDOM = require('react-dom');

const TestUtils = require('react-addons-test-utils');
const $ = require('jQuery');
const expect = require('expect');

var {AddTranslation} = require('AddTranslation');

describe('AddTranslation', () => {
  it('should exist', () => {
    expect(AddTranslation).toExist();
  });

  describe('Adding a valid translation', () => {
    it('should dispatch ADD_TRANSLATION when a valid translation is passed', () => {
      var action = {
        type: 'ADD_TRANSLATION',
        expression: 'kutya',
        meaning: 'dog'
      }

      var spy = expect.createSpy();
      var addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={spy} />);

      var $el = $(ReactDOM.findDOMNode(addTranslation));
      var formEl = $($el.find('form'))[0];
      var expressionInput = $(formEl).find('input')[0];
      var meaningInput = $(formEl).find('input')[1];

      expressionInput.value = action.expression;
      meaningInput.value = action.meaning;

      TestUtils.Simulate.submit(formEl);

      expect(expressionInput.value).toBe('');
      expect(meaningInput.value).toBe('');
      expect(spy).toHaveBeenCalledWith(action);
    });
  });

  describe('Trying to add an invalid translation', () => {
    it('should not dispatch ADD_TRANSLATION when the expression is invalid', () => {
      var action = {
        type: 'ADD_TRANSLATION',
        meaning: 'dog'
      }

      var spy = expect.createSpy();
      var addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={spy} />);

      var $el = $(ReactDOM.findDOMNode(addTranslation));
      var formEl = $($el.find('form'))[0];
      var expressionInput = $(formEl).find('input')[0];
      var meaningInput = $(formEl).find('input')[1];

      meaningInput.value = action.meaning;

      TestUtils.Simulate.submit(formEl);

      expect(meaningInput.value).toBe(action.meaning);
      expect(spy).toNotHaveBeenCalled();
    });

    it('should not dispatch ADD_TRANSLATION when the meaning is invalid', () => {
      var action = {
        type: 'ADD_TRANSLATION',
        expression: 'kutya'
      }

      var spy = expect.createSpy();
      var addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={spy} />);

      var $el = $(ReactDOM.findDOMNode(addTranslation));
      var formEl = $($el.find('form'))[0];
      var expressionInput = $(formEl).find('input')[0];
      var meaningInput = $(formEl).find('input')[1];

      expressionInput.value = action.expression;

      TestUtils.Simulate.submit(formEl);

      expect(expressionInput.value).toBe(action.expression);
      expect(spy).toNotHaveBeenCalled();
    });
  });
});
