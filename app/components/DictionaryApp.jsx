import React from 'react';
import { connect } from 'react-redux';

import UserBar from 'UserBar';
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

export class DictionaryApp extends React.Component {
  render() {
    return (
      <div>

        <UserBar />

        <h1 className="page-title">Dictionary</h1>

        <div className="row">
          <div className="columns small-centered small-11 medium-6 large-4">
            <div className="container">
              <TodoSearch />
              <TodoList />
              <AddTodo />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(DictionaryApp);
