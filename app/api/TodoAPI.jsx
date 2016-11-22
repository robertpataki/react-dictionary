import $ from 'jquery';

module.exports = {
  filterTodos: function (todos, searchText) {
    let filteredTodos = todos;
    searchText = typeof searchText === 'string' ? searchText.toLowerCase() : '';

    // Filter by searchText
    filteredTodos = filteredTodos.filter((todo) => {
      const text = todo.text.toLowerCase();
      return searchText.length === 0 || text.indexOf(searchText) >= 0;
    });

    return filteredTodos;
  }
};
