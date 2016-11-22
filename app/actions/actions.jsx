import moment from 'moment';

import firebase, { firebaseRef, facebookAuthProvider } from 'app/firebase';

export const setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText,
  };
};

export const toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED',
  };
};

export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo,
  };
};

export const startAddTodo = (text) => {
  return (dispatch, getState) => {
    const todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null,
    }

    const uid = getState().auth.uid;
    const todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key,
      }));
    })
  };
};

export const addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos,
  };
};

export const startAddTodos = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const todosRef = firebaseRef.child(`users/${uid}/todos`);

    return todosRef.once('value').then((snapshot) => {
      const data = snapshot.val() || {};
      const todos = [];
      const keys = Object.keys(data);

      keys.forEach(function(key){
        todos.push({
          id: key,
          ...data[key],
        });
      });

      dispatch(addTodos(todos));
    });
  };
};

export const updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export const startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    const updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};

export const login = (uid, email, displayName, photoURL) => {
  return {
    type: 'LOG_IN',
    uid,
    email,
    name: displayName,
    pic: photoURL,
  };
};

export const logout = () => {
  return {
    type: 'LOG_OUT'
  };
};

export const startLogin = () => {
  return (dispatch, getState) => {
  	return firebase.auth().signInWithPopup(facebookAuthProvider).then((result) => {
    }, (error) => {
      console.error('Unable to auth: ', error);
    });
  };
}

export const startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {});
  };
}
