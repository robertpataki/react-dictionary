import expect from 'expect';
import { authReducer, searchTextReducer, toggleShowCompletedReducer, todosReducer } from 'reducers';
import df from 'deep-freeze-strict';
import moment from 'moment';

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('set searchText', () => {
      const action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Searching for...'
      };

      const response = searchTextReducer(df(''), df(action));
      expect(response).toEqual(action.searchText);
    });
  });

  describe('toggleShowCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      const action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      const response = toggleShowCompletedReducer(undefined, df(action));
      expect(response).toEqual(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      const action = {
        type: 'ADD_TODO',
        todo: {
          id: 'abc123',
          text: 'New todo to be done later',
          completed: false,
          createdAt: 1234,
        }
      }

      const response = todosReducer(df([]), df(action));
      expect(response.length).toBe(1);
      expect(response[0]).toEqual(action.todo);
    });

    it('should toggle todo', () => {
      const todos = [{
        id: '123',
        text: 'Todo #1',
        createdAt: 123,
        completed: true,
        completedAt: 125,
      }];
      const updates = {
        completed: false,
        completedAt: null,
      };
      const action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };

      const response = todosReducer(df(todos), df(action));

      expect(response[0].completed).toBe(updates.completed);
      expect(response[0].completedAt).toEqual(updates.completedAt);
      expect(response[0].text).toEqual(todos[0].text);
    });

    it('should add existing todos', () => {
      const action = {
        type: 'ADD_TODOS',
        todos: [
          { id: 1, text: 'Blah', createdAt: 100, completed: false, completedAt: undefined }
        ]
      };

      const response = todosReducer(df([]), df(action));
      expect(response.length).toEqual(1);
      expect(response[0]).toEqual(action.todos[0]);
    });

    it('should clear all todos on logout', () => {
      const todos = [
        { id: '123', text: 'Blah', createdAt: 100, completed: false, completedAt: undefined },
        { id: '234', text: 'Fooh', createdAt: 200, completed: true, completedAt: '1234' }
      ];
      const action = {
        type: 'LOG_OUT'
      };

      const response = todosReducer(df(todos), df(action));
      expect(response.length).toEqual(0);
    });
  });

  describe('authReducer', () => {
    it('should toggle LOG_IN', () => {
      const action = {
        type: 'LOG_IN',
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

    it('should toggle LOG_OUT', () => {
      const authData = {
        uid: '123456'
      };
      const action = {
        type: 'LOG_OUT'
      };

      const response = authReducer(df(authData), df(action));
      expect(response).toEqual({});
    });
  });
});
