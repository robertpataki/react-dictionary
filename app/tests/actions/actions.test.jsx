import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import firebase, {firebaseRef} from 'app/firebase';
import * as actions from 'actions';

const createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  describe('Todos', () => {
    it('should generate search text action', () => {
      const action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Some search text',
      };

      const response = actions.setSearchText(action.searchText);
      expect(response).toEqual(action);
    });

    it('should generate add todo action', () => {
      const action = {
        type: 'ADD_TODO',
        todo: {
          id: 'abc123',
          text: 'Something to do',
          completed: false,
          createdAt: 0,
        }
      };

      const response = actions.addTodo(action.todo);
      expect(response).toEqual(action);
    });

    it('should generate add todos action', () => {
      const action = {
        type: 'ADD_TODOS',
        todos: [
          { id: 1, text: 'Blah', createdAt: 100, completed: false, completedAt: undefined },
          { id: 2, text: 'Meh', createdAt: 200, completed: true, completedAt: 400 }
        ]
      };

      const response = actions.addTodos(action.todos);
      expect(response).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
      const action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      const response = actions.toggleShowCompleted();
      expect(response).toEqual(action);
    });

    it('should generate update todo action', () => {
      const action = {
        type: 'UPDATE_TODO',
        id: '123',
        updates: {
          completed: false
        }
      };

      const response = actions.updateTodo(action.id, action.updates);
      expect(response).toEqual(action);
    });

    describe('Tests with Firebase todos', () => {
      let testTodoRef;
      let uid;
      let todosRef;

      beforeEach((done) => {
        firebase.auth().signInAnonymously().then((user) => {
          uid = user.uid,
          todosRef = firebaseRef.child(`users/${uid}/todos`);

          return todosRef.remove();
        }).then(() => {
          testTodoRef = todosRef.push();

          return testTodoRef.set({
            text: 'Something to do',
            completed: false,
            createdAt: '1234',
          })
          .then(() => done())
          .catch(done);
        });
      });

      afterEach((done) => {
        todosRef.remove().then(() => done());
      });

      it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
        const store = createMockStore({ auth: { uid } });
        const action = actions.startToggleTodo(testTodoRef.key, true);

        store.dispatch(action).then(() => {
          const mockActions = store.getActions();
          const firstAction = mockActions[0];

          expect(firstAction).toInclude({
            type: 'UPDATE_TODO',
            id: testTodoRef.key,
            updates: { completed: true },
          });
          expect(firstAction.updates.completedAt).toExist();

          done();
        }, done);
      });

      it('should populate todos and dispatch ADD_TODOS', (done) => {
        const store = createMockStore({ auth: { uid } });
        const action = actions.startAddTodos();

        store.dispatch(action).then(() => {
          const mockActions = store.getActions();
          expect(mockActions[0].type).toEqual('ADD_TODOS');
          expect(mockActions[0].todos.length).toEqual(1);
          expect(mockActions[0].todos[0].text).toEqual('Something to do');

          done();
        }, done)
      });

      it('should create todo and dispatch ADD_TODO', (done) => {
        const store = createMockStore({ auth: { uid } });
        const todoText = 'This is the text for new todo item';

        store.dispatch(actions.startAddTodo(todoText)).then(() => {
          const actions = store.getActions();
          const firstAction = actions[0];
          expect(firstAction).toInclude({
            type: 'ADD_TODO',
          });

          expect(firstAction).toInclude({
            todo: {
              text: todoText,
            }
          });

          done();
        }).catch(done);
      });
    });
  });

  describe('Authentication', () => {
    it('should generate login action', () => {
      const action = {
        type: 'LOG_IN',
        uid: '123456',
      };
      const response = actions.login(action.uid);

      expect(response).toEqual(action);
    });

    it('should generate logout action', () => {
      const action = {
        type: 'LOG_OUT'
      };
      const response = actions.logout();

      expect(response).toEqual(action);
    });
  });
});
