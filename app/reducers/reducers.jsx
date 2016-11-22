import moment from 'moment';
import uuid from 'node-uuid';

import * as actionTypes from 'actionTypes';

export const searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_TEXT:
      return action.searchText;
    default:
      return state;
  }
};

export const translationsReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_TRANSLATION:
      return [
        ...state,
        action.translation
      ];
    case actionTypes.UPDATE_TRANSLATION:
      return state.map((todo) => {
        if(todo.id === action.id) {
          return {
            ...todo,
            ...action.updates,
          };
        }
        return todo;
      });
    case actionTypes.ADD_TRANSLATIONS:
      return [
        ...state,
        ...action.translations,
      ];
    case actionTypes.LOGOUT:
      return [];
    default:
      return state;
  }
};

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        uid: action.uid,
        name: action.name,
        pic: action.pic,
      };
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};
