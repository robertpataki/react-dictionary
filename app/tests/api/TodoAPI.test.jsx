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

    // Filter by search keyword
    it('should return every todo item if the search keyword is an empty string', () => {
      const filteredTodos = TodoAPI.filterTodos(todos, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return every todo item if the search keyword is a valid string', () => {
      const filteredTodos = TodoAPI.filterTodos(todos, 'some');
      expect(filteredTodos.length).toBe(2);
    });
  });
});
