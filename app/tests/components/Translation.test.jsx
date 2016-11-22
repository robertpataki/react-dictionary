var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');
var expect = require('expect');

var { Translation } = require('Translation');

describe('Translation', () => {
  beforeEach((done) => {
    const data = {
      id: '123abc',
      expression: 'Szia',
      meaning: 'Hi',
      createdAt: 12345,
    };

    const translation = TestUtils.renderIntoDocument(<Translation { ...data } />);
    const $wrapper = $(ReactDOM.findDOMNode(translation));
  })

  it('should exist', () => {
    expect(Translation).toExist();
  });

  it('should render an expression and its matching meaning', () => {
    const $expression = $wrapper.find(`:contains('${data.expression}')`);
    const $meaning = $wrapper.find(`:contains('${data.meaning}')`);

    expect($expression.length).toEqual(1);
    expect($meaning.length).toEqual(1);
  });
});
