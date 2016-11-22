import moment from 'moment';
import uuid from 'node-uuid';

export const searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
};

export const toggleShowCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  }
};

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        action.todo
      ];
    case 'UPDATE_TODO':
      return state.map((todo) => {
        if(todo.id === action.id) {
          return {
            ...todo,
            ...action.updates,
          };
        }
        return todo;
      });
    case 'ADD_TODOS':
      return [
        ...state,
        ...action.todos,
      ];
    case 'LOG_OUT':
      return [];
    default:
      return state;
  }
};

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        uid: action.uid,
        name: action.name,
        pic: action.pic,
      };
    case 'LOG_OUT':
      return {};
    default:
      return state;
  }
};
