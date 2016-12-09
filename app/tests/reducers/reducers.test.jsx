import expect from 'expect';
import df from 'deep-freeze-strict';
import moment from 'moment';

import { authReducer, screenTypeReducer, searchTextReducer, translationsReducer } from 'reducers';
import * as actionTypes from 'actionTypes';
import * as screenTypes from 'screenTypes';

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('set searchText', () => {
      const action = {
        type: actionTypes.SET_SEARCH_TEXT,
        searchText: 'Searching for...'
      };

      const response = searchTextReducer(df(''), df(action));
      expect(response).toEqual(action.searchText);
    });
  });

  describe('translationsReducer', () => {
    it('should add new translation', () => {
      const action = {
        type: actionTypes.ADD_TRANSLATION,
        translation: {
          id: 'abc123',
          expression: 'szeretlek',
          meaning: 'I love you',
          createdAt: 1234,
        }
      }

      const response = translationsReducer(df([]), df(action));
      expect(response.length).toBe(1);
      expect(response[0]).toEqual(action.translation);
    });

    it('should add existing translations', () => {
      const action = {
        type: actionTypes.ADD_TRANSLATIONS,
        translations: [
          { id: '123abc', expression: 'papír pohár', meaning: 'paper cup', createdAt: 100 },
          { id: '234bcd', expression: 'repülő', meaning: 'airplane', createdAt: 200 },
        ]
      };

      const response = translationsReducer(df([]), df(action));
      expect(response.length).toEqual(2);
      expect(response).toEqual(action.translations);
    });

    it('should clear all translations on logout', () => {
      const translations = [
        { id: '123abc', expression: 'medve', meaning: 'bear', createdAt: 100 },
        { id: '234bcd', expression: 'macska', meaning: 'cat', createdAt: 200 },
      ];
      const action = {
        type: actionTypes.LOGOUT
      };

      const response = translationsReducer(df(translations), df(action));
      expect(response.length).toEqual(0);
    });

    it('should delete the selected translation', () => {
      const translations = [
        { id: '123abc', expression: 'medve', meaning: 'bear', createdAt: 100 },
        { id: '234bcd', expression: 'macska', meaning: 'cat', createdAt: 200 },
      ];
      const action = {
        type: actionTypes.DELETE_TRANSLATION,
        id: '123abc'
      };

      const response = translationsReducer(df(translations), df(action));
      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(translations[1]);
    });
  });

  describe('authReducer', () => {
    it('should toggle LOGIN', () => {
      const action = {
        type: actionTypes.LOGIN,
        uid: '123456',
        name: 'Rob Roy',
        pic: 'http://placekitten.com/200/300',
      };

      const response = authReducer(undefined, df(action));
      expect(response).toEqual({
        uid: action.uid,
        name: action.name,
        pic: action.pic,
      });
    });

    it('should toggle LOGOUT', () => {
      const authData = {
        uid: '123456'
      };
      const action = {
        type: actionTypes.LOGOUT
      };

      const response = authReducer(df(authData), df(action));
      expect(response).toEqual({});
    });
  });

  describe('screenTypeReducer', () => {
    it('should set screenType to EDIT_TRANSLATION_SCREEN', () => {
      const action = {
        type: actionTypes.SET_SCREEN_TYPE,
        screenType: {
          type: screenTypes.EDIT_TRANSLATION_SCREEN,
          options: { editableTranslationId: '123abc' },
        }
      };

      const response = screenTypeReducer(df(''), df(action));
      expect(response).toEqual(action.screenType);
    });
  });
});
