import React from 'react';
import { connect } from 'react-redux';

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    const { dispatch } = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }

  render() {
    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={ this.onLogout }>Log out</a>
        </div>

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

export default connect()(TodoApp);
