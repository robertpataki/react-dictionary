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

  it('should dispatch ADD_TRANSLATION when valid translation text is passed', () => {
    var action = {
      type: 'ADD_TRANSLATION',
      text: 'Adding a new translation'
    }

    var spy = expect.createSpy();
    var addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={spy} />);

    var $el = $(ReactDOM.findDOMNode(addTranslation));
    var formEl = $($el.find('form'))[0];
    var translationInput = $(formEl).find('input')[0];

    translationInput.value = action.text;

    TestUtils.Simulate.submit(formEl);

    expect(translationInput.value).toBe('');
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_TRANSLATION with an invalid translation text is passed', () => {
    var spy = expect.createSpy();
    var addTranslation = TestUtils.renderIntoDocument(<AddTranslation dispatch={spy} />);

    var $el = $(ReactDOM.findDOMNode(addTranslation));
    var formEl = $($el.find('form'))[0];
    var translationInput = $(formEl).find('input')[0];

    var translationText = '';
    translationInput.value = translationText;

    TestUtils.Simulate.submit(formEl);

    expect(translationInput.value).toBe('');
    expect(spy).toNotHaveBeenCalled();
  });
});
