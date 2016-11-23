import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

// Raw component
export class Translation extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;

    dispatch(actions.startDeleteTranslation(id));
  }

  render() {
    const { id, expression, meaning, createdAt } = this.props;

    return (
      <div className='translation'>
        <span className="translation__expression">{ expression }</span>
        <span className="translation__meaning">{ meaning }</span>
        <button className="translation__delete button alert" onClick={ this.onDeleteClick }>Delete</button>
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
