const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export var AddTranslation = React.createClass({
  onSubmit: function(e) {
    e.preventDefault();

    var {dispatch} = this.props;
    var expressionText = this.refs.expressionText.value;
    var meaningText = this.refs.meaningText.value;

    if(expressionText.length > 0 && meaningText.length > 0) {
      this.refs.expressionText.value = '';
      this.refs.meaningText.value = '';

      dispatch(actions.AddTranslation(expressionText, meaningText));
    }

    this.refs.expressionText.focus();
  },

  render: function() {
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.onSubmit} className="add-translation">
          <input type="text" ref="expressionText" placeholder="Expression" />
          <input type="text" ref="meaningText" placeholder="Meaning" />
          <button type="submit" className="button expanded">Add Translation</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTranslation);
