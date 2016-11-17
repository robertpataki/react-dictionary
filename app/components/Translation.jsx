const moment = require('moment');
const React = require('react');
const { connect } = require('react-redux');
const actions = require('actions');

// Raw component
export var Translation = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.number.isRequired,
    expression: React.PropTypes.string.isRequired,
    meaning: React.PropTypes.string.isRequired,
  },

  render: function() {
    var { id, expression, meaning, createdAt } = this.props;

    return (
      <div className='translation'>
        <span className="translation__expression">{ expression }</span>
        <span className="translation__meaning">{ meaning }</span>
      </div>
    )
  }
});

// Reduxed component
export default connect()(Translation);
