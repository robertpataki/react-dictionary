import expect from 'expect';
import df from 'deep-freeze-strict';
import moment from 'moment';

import { authReducer, searchTextReducer, translationsReducer } from 'reducers';
import * as actionTypes from 'actionTypes';

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
    it('should add new todo', () => {
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
});
