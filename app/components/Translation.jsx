import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

// Raw component
export class Translation extends React.Component {
  render() {
    var { id, expression, meaning, createdAt } = this.props;

    return (
      <div className='translation'>
        <span className="translation__expression">{ expression }</span>
        <span className="translation__meaning">{ meaning }</span>
      </div>
    )
  }
}

Translation.propTypes = {
  id: React.PropTypes.string.isRequired,
  createdAt: React.PropTypes.number.isRequired,
  expression: React.PropTypes.string.isRequired,
  meaning: React.PropTypes.string.isRequired,
}

// Reduxed component
export default connect()(Translation);
