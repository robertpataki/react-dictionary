import $ from 'jquery';

module.exports = {
  filterTodos: function (todos, showCompleted, searchText) {
    let filteredTodos = todos;
    searchText = typeof searchText === 'string' ? searchText.toLowerCase() : '';

    // Filter by showCompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      const text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) >= 0;
    });

    // Sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if(!a.completed && b.completed) {
        return -1;
      } else if (a.completed && !b.completed) {
        return 1;
      } else {
        return 0;
      }
    });

    return filteredTodos;
  }
};
