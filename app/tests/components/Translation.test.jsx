import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import { Translation } from 'Translation';
import * as actions from 'actions';
import * as actionTypes from 'actionTypes';

describe('Translation', () => {
  const data = {
    id: '123abc',
    expression: 'Szia',
    meaning: 'Hi',
    createdAt: 12345,
  };;

  it('should exist', () => {
    expect(Translation).toExist();
  });

  it('should render an expression and its matching meaning', () => {
    const translation = TestUtils.renderIntoDocument(<Translation { ...data } />);
    const $wrapper = $(ReactDOM.findDOMNode(translation));

    const $expression = $wrapper.find(`:contains('${data.expression}')`);
    const $meaning = $wrapper.find(`:contains('${data.meaning}')`);

    expect($expression.length).toEqual(1);
    expect($meaning.length).toEqual(1);
  });

  it('should dispatch startDeleteTranslation', () => {
    const spy = expect.createSpy();
    const translation = TestUtils.renderIntoDocument(<Translation { ...data } dispatch={ spy }/>);
    const $wrapper = $(ReactDOM.findDOMNode(translation));
    const action = actions.startDeleteTranslation(data.id);

    const deleteButton = $($wrapper.find('button'))[0];

    TestUtils.Simulate.click(deleteButton);

    expect(spy).toHaveBeenCalledWith(action);
  });
});
