const expect = require('expect');
const actions = require('actions');

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    }

    var response = actions.setSearchText(action.searchText);
    expect(response).toEqual(action);
  });

  it('should generate add todo action', () => {
    var action = {
      type: 'ADD_TODO',
      text: 'Something to do'
    };

    var response = actions.addTodo(action.text);
    expect(response).toEqual(action);
  });

  it('should generate add todos action', () => {
    var action = {
      type: 'ADD_TODOS',
      todos: [
        {id: 1, text: 'Blah', createdAt: 100, completed: false, completedAt: undefined},
        {id: 2, text: 'Meh', createdAt: 200, completed: true, completedAt: 400}
      ]
    };

    var response = actions.addTodos(action.todos);
    expect(response).toEqual(action);
  });

  it('should generate toggle show completed action', () => {
    var action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };

    var response = actions.toggleShowCompleted();
    expect(response).toEqual(action);
  });

  it('should generate toggle todo action', () => {
    var action = {
      type: 'TOGGLE_TODO',
      id: 2
    };

    var response = actions.toggleTodo(action.id);
    expect(response).toEqual(action);
  });
});
