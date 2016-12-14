import React from 'react';
import ReactDOM from 'react-dom';

import TestUtilsAdditions from 'react-testutils-additions';
import TestUtils from 'react-addons-test-utils';
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

    const expression = TestUtils.findRenderedDOMComponentWithClass(translation, 'translation__expression');
    const meaning = TestUtils.findRenderedDOMComponentWithClass(translation, 'translation__meaning');

    expect(expression.textContent).toEqual(data.expression);
    expect(meaning.textContent).toEqual(data.meaning);
  });

  it('should dispatch startDeleteTranslation', () => {
    const spy = expect.createSpy();
    const translation = TestUtils.renderIntoDocument(<Translation { ...data } dispatch={ spy }/>);
    const action = actions.startDeleteTranslation(data.id);
    const deleteButton = TestUtils.findRenderedDOMComponentWithClass(translation, 'translation__button--delete');

    TestUtils.Simulate.click(deleteButton);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should dispatch setScreenType with editableTranslationId set for EDIT_TRANSLATION_SCREEN type screen', () => {
    const spy = expect.createSpy();
    const translation = TestUtils.renderIntoDocument(<Translation { ...data } dispatch={ spy }/>);
    const action = actions.setScreenType(screenTypes.EDIT_TRANSLATION_SCREEN, data.id);
    const editButton = TestUtils.findRenderedDOMComponentWithClass(translation, 'translation__button--edit');

    TestUtils.Simulate.click(editButton);
    expect(spy).toHaveBeenCalledWith(action);
  });
});
