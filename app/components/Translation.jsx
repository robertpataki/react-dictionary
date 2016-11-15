const moment = require('moment');
const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

// Raw component
export var Translation = React.createClass({
  render: function() {
    var {id, expression, meaning, createdAt} = this.props;

    return (
      <div className='translation'>
        <div>
          <span>{expression}</span>
          <span>{meaning}</span>
        </div>
      </div>
    )
  }
});

// Reduxed component
export default connect()(Translation);
