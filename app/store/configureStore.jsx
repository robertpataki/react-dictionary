import * as redux from 'redux';
import thunk from 'redux-thunk';

import { authReducer, searchTextReducer, todosReducer } from 'reducers';

export const configure = (initialState = {}) => {
  const reducer = redux.combineReducers({
    auth: authReducer,
    searchText: searchTextReducer,
    todos: todosReducer,
  });

  const store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
