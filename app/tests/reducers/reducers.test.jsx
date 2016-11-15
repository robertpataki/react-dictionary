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

  describe('toggleShowCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var response = reducers.toggleShowCompletedReducer(df(false), df(action));
      expect(response).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'New todo to be done later'
      }

      var response = reducers.todosReducer(df([]), df(action));
      expect(response.length).toBe(1);
      expect(response[0].text).toEqual(action.text);
    });

    it('should toggle todo', () => {
      var action = {
        type: 'TOGGLE_TODO',
        id: 1
      }
      var todos = [{
        id: 1,
        text: 'Todo #1',
        createdAt: 123,
        completedAt: 125,
        completed: true
      }, {
        id: 2,
        text: 'Todo #2',
        createdAt: 321,
        completedAt: 322,
        completed: true
      }, {
        id: 3,
        text: 'Todo #3',
        createdAt: 333,
        completedAt: undefined,
        completed: false
      }];

      var response = reducers.todosReducer(df(todos), df(action));

      expect(response[0].completed).toBe(false);
      expect(response[0].completedAt).toEqual(undefined);
    });

    it('should add existing todos', () => {
      var action = {
        type: 'ADD_TODOS',
        todos: [
          {id: 1, text: 'Blah', createdAt: 100, completed: false, completedAt: undefined}
        ]
      };

      var response = reducers.todosReducer(df([]), df(action));
      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(action.todos[0]);
    });
  });
});
