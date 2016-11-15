const expect = require('expect');
const reducers = require('reducers');
const df = require('deep-freeze-strict');
const moment = require('moment');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Searching for...'
      };

      var response = reducers.searchTextReducer(df(''), df(action));
      expect(response).toEqual(action.searchText);
    });
  });

  describe('translationsReducer', () => {
    it('should add new translation', () => {
      var action = {
        type: 'ADD_TRANSLATION',
        text: 'New translation to be done later'
      }

      var response = reducers.translationsReducer(df([]), df(action));
      expect(response.length).toBe(1);
      expect(response[0].text).toEqual(action.text);
    });

    it('should add existing translations', () => {
      var action = {
        type: 'ADD_TRANSLATIONS',
        translations: [
          {id: 1, text: 'Blah', createdAt: 100, completed: false, completedAt: undefined}
        ]
      };

      var response = reducers.translationsReducer(df([]), df(action));
      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(action.translations[0]);
    });
  });
});
