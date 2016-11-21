import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class AddTodo extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';
      dispatch(actions.startAddTodo(todoText));
    }

    this.refs.todoText.focus();
  }

  render() {
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={ this.onSubmit } className="add-todo">
          <input type="text" ref="todoText" placeholder="What's next" />
          <button type="submit" className="button expanded">Add Todo</button>
        </form>
      </div>
    );
  }
}

export default connect()(AddTodo);
