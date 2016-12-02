import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { TimelineMax, TweenMax, Expo } from 'gsap';
import GSAP from 'react-gsap-enhancer';
import connectWithTransitionGroup from 'connect-with-transition-group';

import Brewser from 'brewser';
import Hammer from 'react-hammerjs';

import * as actions from 'actions';

const br = Brewser.br;

// Raw component
export class Translation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offsetX: 0,
      activityHighlight: undefined,
    };

    this.onEditSelect = this.onEditSelect.bind(this);
    this.onDeleteSelect = this.onDeleteSelect.bind(this);
    this.onTriggerMouseOver = this.onTriggerMouseOver.bind(this);
    this.onTriggerMouseOut = this.onTriggerMouseOut.bind(this);
    this.onTouchStart = this.handleTouchStart.bind(this);
    this.onTouchMove = this.handleTouchMove.bind(this);
    this.onTouchEnd = this.handleTouchEnd.bind(this);

    this.panAnim = this.panAnim.bind(this);
    // this.touchMoveAnim = this.touchMoveAnim.bind(this);
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

  panAnim(utils) {
    let obj = {
      x: this.offsetX,
    };

    this.tween = new TimelineMax({});

    return this.tween
    .to(obj, 0.9, {
      x: 0,
      ease: Expo.easeOut,
      onUpdate: () => {
        this.applyContentOffsetX(obj.x);
      }
    });
  }

  componentWillAppear(callback) {
    callback();
  }

  componentWillEnter(callback) {
    const controller = this.addAnimation(this.createAnim, { callback: callback });
  }

  componentWillLeave(callback) {
    const controller = this.addAnimation(this.deleteAnim, { callback: callback });
  }

  componentDidAppear() {}
  componentDidLeave() {}
  componentDidEnter() {}
  componentDidMount() {}
  componentWillUnmount() {}

//////////////////
///////// User interaction events
/////

  /* Generic events */
  onDeleteSelect(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;
    dispatch(actions.startDeleteTranslation(id));
  }

  onEditSelect(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;
  }

  handleTouchStart(e) {
    if (this.tween) {
      this.tween.kill().remove();
      this.tween = undefined;
    }
    this.clientX = e.touches[0].clientX;
  }

  handleTouchMove(e) {
    const buttonActivationOffsetX = 100;
    const maxOffsetX = 200;

    const clientX = e.touches[0].clientX;
    let offsetX = clientX - this.clientX;

    // if (offsetX > maxOffsetX) {
    //   offsetX = maxOffsetX;
    // } else if (offsetX < -1 * maxOffsetX) {
    //   offsetX = -1 * maxOffsetX;
    // }

    this.offsetX = offsetX;
    this.applyContentOffsetX(offsetX);

    let activityHighlight = undefined;
    if (offsetX >= buttonActivationOffsetX) {
      activityHighlight = 'EDIT';
    } else if(offsetX <= -1 * buttonActivationOffsetX) {
      activityHighlight = 'DELETE';
    }

    this.setState({
      activityHighlight,
    });
  }

  // touchMoveAnim(utils) {
  //   return TweenMax.set(this.contentsEl, {
  //     x: utils.options.offsetX,
  //   });
  // }

  handleTouchEnd(e) {
    // console.log('handleTouchEnd');

    const animController = this.addAnimation(this.panAnim, {
      offsetX: 0,
    });
  }

  /* Desktop device events */
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

  applyContentOffsetX(x) {
    console.log(this.contentsEl);
    this.contentsEl.style.transform = `translate3d(${x}px, 0, 0)`;
    this.contentsEl.style.webKitTransform = `translate3d(${x}px, 0, 0)`;
  }

  renderTriggers(touchDevice) {
    if(touchDevice) {
      return(
        <div onTouchStart={ this.onTouchStart } onTouchMove={ this.onTouchMove } onTouchEnd={ this.onTouchEnd }>
          <div className="translation__wrapper translation__wrapper--triggers">
            <Hammer onTap={ this.onEditSelect } name="leftTrigger">
              <span className="translation__trigger translation__trigger--left"></span>
            </Hammer>
            <Hammer>
              <span className="translation__trigger translation__trigger--right" onTap={ this.onEditSelect } name="rightTrigger"></span>
            </Hammer>
          </div>
        </div>
      );
    } else {
      return(
        <div className="translation__wrapper translation__wrapper--triggers">
          <span className="translation__trigger translation__trigger--left" onClick={ this.onEditSelect } onMouseOver={ this.onTriggerMouseOver } onMouseOut={ this.onTriggerMouseOut } name="leftTrigger"></span>
          <span className="translation__trigger translation__trigger--right" onClick={ this.onDeleteSelect } onMouseOver={ this.onTriggerMouseOver } onMouseOut={ this.onTriggerMouseOut } name="rightTrigger"></span>
        </div>
      );
    }
  }

  render() {
    const { id, expression, meaning, createdAt } = this.props;
    const { activityHighlight } = this.state;

    let className = 'translation';

    switch(activityHighlight) {
      case 'EDIT':
        className += ' translation--edit-active';
        break;
      case 'DELETE':
        className += ' translation--delete-active';
        break;
    }

    return (
      <div className={ className }>
        <div className="translation__wrapper translation__wrapper--contents" name="contents" ref={(ref) => {
          this.contentsEl = ref;
        }}>
          <span className="translation__expression">{ expression }</span>
          <span className="translation__meaning">{ meaning }</span>
        </div>

        <div className="translation__wrapper translation__wrapper--buttons" name="buttons">
          <button className="translation__button translation__button--edit" name="editButton" onClick={ this.onEditSelect }></button>
          <button className="translation__button translation__button--delete" name="deleteButton" onClick={ this.onDeleteSelect }></button>
        </div>

        { this.renderTriggers(true) }
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
