import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { TimelineMax, TweenMax, Expo } from 'gsap';
import GSAP from 'react-gsap-enhancer';
import connectWithTransitionGroup from 'connect-with-transition-group';
import Hammer from 'react-hammerjs';
const BREWSER = require('brewser').BREWSER;

import * as actions from 'actions';
import * as screenTypes from 'screenTypes';

const STATUS = {
  EDIT: 'edit',
  DELETE: 'delete',
  STAND_BY: 'standBy',
};

// Raw component
export class Translation extends React.Component {
  constructor(props) {
    super(props);

    // Generic events
    this.handleEditButtonSelect = this.handleEditButtonSelect.bind(this);
    this.handleDeleteButtonSelect = this.handleDeleteButtonSelect.bind(this);

    // Mouse events
    this.onTriggerMouseOver = this.onTriggerMouseOver.bind(this);
    this.onTriggerMouseOut = this.onTriggerMouseOut.bind(this);

    // Touch events
    this.onTouchStart = this.handleTouchStart.bind(this);
    this.onTouchMove = this.handleTouchMove.bind(this);
    this.onTouchEnd = this.handleTouchEnd.bind(this);

    // Animations
    this.slideBackAnim = this.slideBackAnim.bind(this);
    this.hoverAnim = this.hoverAnim.bind(this);

    // Initial state
    this.state = {};
    this.ignoreUser = false;
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

    const trigger = utils.options.trigger;
    const state = utils.options.state || 'off';

    let targetOffsetX;
    switch(trigger) {
      case this.leftTrigger:
        targetOffsetX = state === 'off' ? 0 : this.editButton.offsetWidth;
        break;
      case this.rightTrigger:
        targetOffsetX = state === 'off' ? 0 : -1 * this.deleteButton.offsetWidth;
        break;
    }

    return TweenMax.to(contents, 0.9, {
      x: targetOffsetX,
      ease: Expo.easeOut
    });
  }

  slideBackAnim(utils) {
    let obj = {
      x: this.offsetX,
    };

    this.tween = new TimelineMax({});

    const callback = utils.options.callback;

    return this.tween
    .to(obj, 0.45, {
      x: 0,
      ease: Quart.easeOut,
      onStart: () => {
        this.ignoreUser = true;
      },
      onUpdate: () => {
        this.applyOffsetXToEl(this.contentsEl, obj.x);
        this.applyButtonOffsetX(obj.x);
      },
      onComplete: () => {
        this.offsetX = 0;
        this.ignoreUser = false;
        this.resetButtons();

        if (callback) {
          callback.call(this);
        }
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
  componentWillUnmount() {}

  componentDidMount() {
    // Set trigger width
    if (this.leftTrigger && this.rightTrigger) {
      this.leftTrigger.style.maxWidth = this.editButton.offsetWidth;
      this.rightTrigger.style.maxWidth = this.deleteButton.offsetWidth;
    }
  }

//////////////////
///////// User interaction events
/////

  /* Generic events */
  handleDeleteButtonSelect() {
    const { dispatch, id } = this.props;
    dispatch(actions.startDeleteTranslation(id));
  }

  handleEditButtonSelect() {
    const { dispatch} = this.props;
    dispatch(actions.setScreenType(screenTypes.EDIT_TRANSLATION_SCREEN));
  }

  handleTouchStart(e) {
    if (!this.ignoreUser) {
      if (this.tween) {
        this.tween.kill().remove();
        this.tween = undefined;
      }
      this.clientX = e.touches[0].clientX;
      this.clientY = e.touches[0].clientY;
    } else {
      this.clientX = this.clientY = undefined;
    }
  }

  handleTouchMove(e) {
    if (!this.ignoreUser && typeof this.clientX !== 'undefined') {
      const maxOffsetX = 150;

      const clientX = e.touches[0].clientX;
      let offsetX = clientX - this.clientX;

      /* Prevents scrolling if the user is panning the item */
      if (offsetX >= 20) {
        e.preventDefault();
      }

      if (offsetX > maxOffsetX) {
        offsetX = maxOffsetX;
      } else if (offsetX < -1 * maxOffsetX) {
        offsetX = -1 * maxOffsetX;
      }

      this.offsetX = offsetX;
      this.applyOffsetXToEl(this.contentsEl, offsetX);
      this.applyButtonOffsetX(offsetX);
    }
  }

  handleTouchEnd(e) {
    if (!this.ignoreUser && typeof this.clientX !== 'undefined') {
      const cachedStatus = this.status;

      // Play out animation
      const animController = this.addAnimation(this.slideBackAnim, {
        callback: () => {
          // Trigger user action
          switch(cachedStatus) {
            case STATUS.EDIT:
              this.handleEditButtonSelect();
              break;
            case STATUS.DELETE:
              this.handleDeleteButtonSelect();
              break;
          }
        }
      });
    }
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

  resetButtons() {
    this.buttonWrapper.className = this.buttonWrapper.className.replace(/edit|delete/gi, '')
    this.buttonWrapper.className = this.buttonWrapper.className.replace(/^[.\s]+|[.\s]+$/g, '');
  }

  applyOffsetXToEl(el, offsetX) {
    if (!el || typeof el.style === 'undefined') {
      return;
    }

    el.style.transform = `translate3d(${offsetX}px, 0, 0)`;
    el.style.webKitTransform = `translate3d(${offsetX}px, 0, 0)`;
  }

  applyButtonOffsetX(offsetX) {
    if (!this.editButton || !this.deleteButton) {
      return;
    }

    const buttonWidth = this.editButton.offsetWidth;
    const buttonActivationOffsetX = 75;

    if (offsetX > 0) {
      // EDIT button
      // Move the button with the parent
      if (offsetX > buttonWidth) {
        this.applyOffsetXToEl(this.editButton, offsetX - buttonWidth);
      }

      // Active?
      if (offsetX > buttonActivationOffsetX) {
        if (this.buttonWrapper.className.indexOf('edit') < 0) {
          this.buttonWrapper.className += ' edit';
          this.status = STATUS.EDIT;
        }
      } else {
        this.buttonWrapper.className = this.buttonWrapper.className.replace('edit', '');
        this.status = STATUS.STAND_BY;
      }

    } else {
      // DELETE button
      // Move the button with the parent
      if (-1 * offsetX > buttonWidth) {
        this.applyOffsetXToEl(this.deleteButton, offsetX + buttonWidth);
      }

      // Active?
      if (-1 * offsetX > buttonActivationOffsetX) {
        if (this.buttonWrapper.className.indexOf('delete') < 0) {
          this.buttonWrapper.className += ' delete';
          this.status = STATUS.DELETE;
        }
      } else {
        this.buttonWrapper.className = this.buttonWrapper.className.replace('delete', '');
        this.status = STATUS.STAND_BY;
      }
    }
  }

  renderTriggers(touchDevice) {
    if(touchDevice) {
      return(
          <div className="translation__wrapper translation__wrapper--triggers" onTouchStart={ this.onTouchStart } onTouchMove={ this.onTouchMove } onTouchEnd={ this.onTouchEnd }></div>
      );
    } else {
      return(
        <div className="translation__wrapper translation__wrapper--triggers">
          <span className="translation__trigger translation__trigger--left" onClick={ this.handleEditButtonSelect } onMouseOver={ this.onTriggerMouseOver } onMouseOut={ this.onTriggerMouseOut } ref={(ref) => {
            this.leftTrigger = ref;
          }}></span>
        <span className="translation__trigger translation__trigger--right" onClick={ this.handleDeleteButtonSelect } onMouseOver={ this.onTriggerMouseOver } onMouseOut={ this.onTriggerMouseOut } ref={(ref) => {
            this.rightTrigger = ref;
          }}></span>
        </div>
      );
    }
  }

  render() {
    const { id, expression, meaning, createdAt } = this.props;

    return (
      <div className="translation">
        <div className="translation__wrapper translation__wrapper--contents" name="contents" ref={(ref) => {
          this.contentsEl = ref;
        }}>
          <span className="translation__expression">{ expression }</span>
          <span className="translation__meaning">{ meaning }</span>
        </div>

        <div className="translation__wrapper translation__wrapper--buttons" ref={(ref) => {
            this.buttonWrapper = ref; }}>
          <button className="translation__button translation__button--edit" ref={(ref) => {
            this.editButton = ref;
          }} onClick={ this.handleEditButtonSelect }></button>
          <button className="translation__button translation__button--delete" ref={(ref) => {
            this.deleteButton = ref;
          }} onClick={ this.handleDeleteButtonSelect }></button>
        </div>

        { this.renderTriggers(BREWSER.device.touch) }
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
  (state) => state,
  null,
  null,
  // IMPORTANT: must pass this flag to react-redux/connect
  {
    withRef: true,
  }
)(GSAP()(Translation)));
