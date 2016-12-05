import moment from 'moment';
import uuid from 'node-uuid';

import * as actionTypes from 'actionTypes';
import * as screenTypes from 'screenTypes';

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
      return state.map((translation) => {
        if(translation.id === action.id) {
          return {
            ...translation,
            ...action.updates,
          };
        }
        return translation;
      });
    case actionTypes.ADD_TRANSLATIONS:
      return [
        ...state,
        ...action.translations,
      ];
    case actionTypes.DELETE_TRANSLATION:
      return state.filter((translation) => translation.id !== action.id);
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

export const screenTypeReducer = (state = screenTypes.DICTIONARY_SCREEN, action) => {
  switch (action.type) {
    case actionTypes.SET_SCREEN_TYPE:
      return action.screenType;
    default:
      return state;
  }
};
