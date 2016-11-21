import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

// Raw component
export class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { id, dispatch } = this.props;
    dispatch(actions.startToggleTodo(id, this.refs.checkbox.checked));
  }

  render() {
    const { id, text, completed, createdAt, completedAt } = this.props;
    const todoClassName = completed ? 'todo todo-completed' : 'todo';

    const renderDate = () => {
      const message = completed ? 'Completed ' : 'Created ';
      const timestamp = completed ? completedAt : createdAt;

      return message + moment.unix(timestamp).fromNow();
    }

    return (
      <label className={ todoClassName } htmlFor={`todoCompletedCheckbox-${id}`} onClick={ this.handleClick }>
        <div>
          <input type="checkbox" ref="checkbox" id={`todoCompletedCheckbox-${id}`} defaultChecked={ completed } />
        </div>
        <div>
          <p>{ text }</p>
          <p className="todo__subtext">{ renderDate() }</p>
        </div>
      </label>
    )
  }
}

// Reduxed component
export default connect()(Todo);
