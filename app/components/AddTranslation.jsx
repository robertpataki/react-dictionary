const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export var AddTranslation = React.createClass({
  onSubmit: function(e) {
    e.preventDefault();

    var {dispatch} = this.props;
    var expression = this.refs.expression.value;
    var meaning = this.refs.meaning.value;

    if(expression.length > 0 && meaning.length > 0) {
      this.refs.expression.value = '';
      this.refs.meaning.value = '';

      dispatch(actions.AddTranslation(expression, meaning));
    }

    this.refs.expression.focus();
  },

  render: function() {
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.onSubmit} className="add-translation">
          <input type="text" ref="expression" placeholder="Expression" />
          <input type="text" ref="meaning" placeholder="Meaning" />
          <button type="submit" className="button expanded">Add Translation</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTranslation);
