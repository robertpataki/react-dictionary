const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export var AddTranslation = React.createClass({
  onSubmit: function(e) {
    e.preventDefault();

    var {dispatch} = this.props;
    var translationText = this.refs.translationText.value;

    if(translationText.length > 0) {
      this.refs.translationText.value = '';

      dispatch(actions.AddTranslation(translationText));
    }

    this.refs.translationText.focus();
  },

  render: function() {
    return (
      <div className="container__footer">
        <form ref="form" onSubmit={this.onSubmit} className="add-translation">
          <input type="text" ref="translationText" placeholder="What's next" />
          <button type="submit" className="button expanded">Add Translation</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTranslation);
