const moment = require('moment');
const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

// Raw component
export var Todo = React.createClass({
  handleClick: function() {
    var {id, dispatch} = this.props;

    this.refs.checkbox.checked = this.refs.checkbox.checked ? false : true;

    dispatch(actions.toggleTodo(id));
  },

  render: function() {
    var {id, text, completed, createdAt, completedAt} = this.props;
    var todoClassName = completed ? 'todo todo-completed' : 'todo';

    var renderDate = () => {
      var message = completed ? 'Completed ' : 'Created ';
      var timestamp = completed ? completedAt : createdAt;

      return message + moment.unix(timestamp).fromNow();
    }

    return (
      <div className={todoClassName} onClick={this.handleClick}>
        <div>
          <input type="checkbox" ref="checkbox" defaultChecked={completed} />
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    )
  }
});

// Reduxed component
export default connect()(Todo);
