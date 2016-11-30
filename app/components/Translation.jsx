import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { TimelineMax, TweenMax, Expo } from 'gsap';
import GSAP from 'react-gsap-enhancer';
import connectWithTransitionGroup from 'connect-with-transition-group';

import * as actions from 'actions';

// Raw component
export class Translation extends React.Component {
  constructor(props) {
    super(props);

    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onTriggerMouseOver = this.onTriggerMouseOver.bind(this);
    this.onTriggerMouseOut = this.onTriggerMouseOut.bind(this);
  }

  createAnim(utils) {
    // DOM cache
    const target = utils.target;
    const contents = target.find({ name: 'contents' })[0];
    const callback = utils.options.callback;
    const contentsHeight = contents.offsetHeight;

    var tween = new TimelineMax({
      onComplete: () => {
        callback.call();
      }
    });

    return tween
    .fromTo(target, 0.2, {
      height: 0
    }, {
      height: contentsHeight,
      ease: Expo.easeOut,
    })
    .fromTo(target, 0.4, {
      alpha: 0
    }, {
      alpha: 1
    });
  }

  deleteAnim(utils) {
    // DOM cache
    const target = utils.target;
    const callback = utils.options.callback;

    var tween = new TimelineMax({
      onComplete: () => {
        callback.call();
      }
    });

    return tween
    .to(target, 0.2, {
      alpha: 0,
    })
    .to(target, 0.4, {
      height: 0,
      ease: Expo.easeOut,
    });
  }

  hoverAnim(utils) {
    // DOM cache
    const target = utils.target;
    const contents = target.find({ name: 'contents' })[0];
    const deleteButton = target.find({ name: 'deleteButton' })[0];
    const editButton = target.find({ name: 'editButton' })[0];
    const trigger = utils.options.trigger;
    const state = utils.options.state || 'off';
    const leftTrigger = target.find({ name: 'leftTrigger' })[0];
    const rightTrigger = target.find({ name: 'rightTrigger' })[0];

    let targetOffsetX;
    switch(trigger) {
      case leftTrigger:
        targetOffsetX = state === 'off' ? 0 : editButton.offsetWidth;
        break;
      case rightTrigger:
        targetOffsetX = state === 'off' ? 0 : -1 * deleteButton.offsetWidth;
        break;
    }

    return TweenMax.to(contents, 0.9, {
      x: targetOffsetX,
      ease: Expo.easeOut
    });
  }

  componentWillAppear(callback) {
    callback();
  }
  componentDidAppear() {}

  componentWillEnter(callback) {
    const controller = this.addAnimation(this.createAnim, { callback: callback });
  }
  componentDidEnter() {}

  componentWillLeave(callback) {
    const controller = this.addAnimation(this.deleteAnim, { callback: callback });
  }
  componentDidLeave() {}



  componentDidMount() {}

  componentWillUnmount() {}

  onTriggerMouseOver(e) {
    const animController = this.addAnimation(this.hoverAnim, {
      trigger: e.currentTarget,
      state: 'on',
    });
  }

  onTriggerMouseOut(e) {
    const animController = this.addAnimation(this.hoverAnim, {
      trigger: e.currentTarget,
      state: 'off',
    });
  }

  onDeleteClick(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;
    dispatch(actions.startDeleteTranslation(id));
  }

  onEditClick(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;
  }

  render() {
    const { id, expression, meaning, createdAt } = this.props;

    return (
      <div className='translation'>
        <div className="translation__wrapper translation__wrapper--contents" name="contents">
          <span className="translation__expression">{ expression }</span>
          <span className="translation__meaning">{ meaning }</span>
        </div>

        <div className="translation__wrapper translation__wrapper--buttons">
          <button className="translation__button translation__button--edit" name="editButton" onClick={ this.onEditClick }></button>
          <button className="translation__button translation__button--delete" name="deleteButton" onClick={ this.onDeleteClick }></button>
        </div>

        <div className="translation__wrapper translation__wrapper--triggers">
          <span className="translation__trigger translation__trigger--left" onClick={ this.onEditClick } onMouseOver={ this.onTriggerMouseOver } onMouseOut={ this.onTriggerMouseOut } name="leftTrigger"></span>
          <span className="translation__trigger translation__trigger--right" onClick={ this.onDeleteClick } onMouseOver={ this.onTriggerMouseOver } onMouseOut={ this.onTriggerMouseOut } name="rightTrigger"></span>
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
export default connectWithTransitionGroup(connect(
  false,
  null,
  null,
  // IMPORTANT: must pass this flag to react-redux/connect
  {
    withRef: true,
  }
)(GSAP()(Translation)));
