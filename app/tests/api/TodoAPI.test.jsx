import expect from 'expect';
import TodoAPI from 'TodoAPI';

describe('TodoAPI', () => {
  it('it should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('filterTodos', () => {
    const todos = [{
      id: 1,
      text: 'Some text here',
      completed: true,
    }, {
      id: 2,
      text: 'Some more text here',
      completed: false,
    }, {
      id: 3,
      text: 'Even more text here',
      completed: true,
    }];

    // Filter by completed status
    it('should return all todos if `showCompleted` is true', () => {
      const filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return only the incomplete todos if `showCompleted` is false', () => {
      const filteredTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      const filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });


    // Filter by search keyword
    it('should return every todo item if the search keyword is an empty string', () => {
      const filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return every todo item if the search keyword is a valid string', () => {
      const filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
      expect(filteredTodos.length).toBe(2);
    });
  });
});
