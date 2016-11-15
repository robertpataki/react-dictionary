var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');
var expect = require('expect');

var {Translation} = require('Translation');

describe('Translation', () => {
  it('should exist', () => {
    expect(Translation).toExist();
  });
});
