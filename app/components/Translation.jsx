import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

// Raw component
export class Translation extends React.Component {
  constructor(props) {
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onHitAreaMouseOver = this.onHitAreaMouseOver.bind(this);
    this.onHitAreaMouseOut = this.onHitAreaMouseOut.bind(this);
  }

  onHitAreaMouseOver(e) {
    const { contents, hitareaLeft, hitareaRight } = this.refs;
    const target = e.currentTarget;

    if(target === hitareaLeft) {
      console.log('EDIT');
    } else if(target === hitareaRight) {
      console.log('DELETE');
    }
  }
  onHitAreaMouseOut(e) {
    const { contents, hitareaLeft, hitareaRight } = this.refs;
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
        <div className="translation__wrapper translation__wrapper--contents" ref="contents">
          <span className="translation__expression">{ expression }</span>
          <span className="translation__meaning">{ meaning }</span>
        </div>

        <div className="translation__wrapper translation__wrapper--buttons">
          <button className="translation__delete button alert" onClick={ this.onDeleteClick }>Delete</button>
        </div>
        
        <div className="translation__wrapper translation__wrapper--hitarea">
          <span className="translation__hitarea translation__hitarea--left" onMouseOver={ this.onHitAreaMouseOver } onMouseOut={ this.onHitAreaMouseOut } ref="hitareaLeft"></span>
          <span className="translation__hitarea translation__hitarea--right" onMouseOver={ this.onHitAreaMouseOver } onMouseOut={ this.onHitAreaMouseOut } ref="hitareaRight"></span>
        </div>
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
