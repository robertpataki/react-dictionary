import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import expect from 'expect';

import { Translation } from 'Translation';
import * as actions from 'actions';
import * as actionTypes from 'actionTypes';
import * as screenTypes from 'screenTypes';

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

    const $expression = $wrapper.find(`span:contains('${data.expression}')`);
    const $meaning = $wrapper.find(`span:contains('${data.meaning}')`);

    expect($expression.length).toEqual(1);
    expect($meaning.length).toEqual(1);
  });

  it('should dispatch startDeleteTranslation', () => {
    const spy = expect.createSpy();
    const translation = TestUtils.renderIntoDocument(<Translation { ...data } dispatch={ spy }/>);
    const action = actions.startDeleteTranslation(data.id);
    const $wrapper = $(ReactDOM.findDOMNode(translation));
    const deleteButton = $($wrapper.find('.translation__button--delete'))[0];

    TestUtils.Simulate.click(deleteButton);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch setScreenType', () => {
    const spy = expect.createSpy();
    const translation = TestUtils.renderIntoDocument(<Translation { ...data } dispatch={ spy }/>);
    const action = actions.setScreenType(screenTypes.EDIT_TRANSLATION_SCREEN);
    const $wrapper = $(ReactDOM.findDOMNode(translation));
    const editButton = $($wrapper.find('.translation__button--edit'))[0];

    TestUtils.Simulate.click(editButton);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
