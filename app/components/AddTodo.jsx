const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export var AddTodo = React.createClass({
  onSubmit: function(e) {
    e.preventDefault();

    var {dispatch} = this.props;
    var todoText = this.refs.todoText.value;

    if(todoText.length > 0) {
      this.refs.todoText.value = '';

      dispatch(actions.addTodo(todoText));
    }

    this.refs.todoText.focus();
  },

  render: function() {
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.onSubmit} className="add-todo">
          <input type="text" ref="todoText" placeholder="What's next" />
          <button type="submit" className="button expanded">Add Todo</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
