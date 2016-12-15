import React from 'react';
import { connect } from 'react-redux';

// GSAP Animation imports
import { TimelineMax, Expo } from 'gsap';
import GSAP from 'react-gsap-enhancer';
import TransitionGroup from 'react-addons-transition-group';
import connectWithTransitionGroup from 'connect-with-transition-group';
// END OF GSAP Animation imports

import { COPY_DOC } from 'copyDoc';
import Scrollie from 'Scrollie';
import Translation from 'Translation';

export class Dictionary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copy: COPY_DOC.en.dictionary,
      isScrolling: false,
    };

    this.onScrollieUpdate = this.onScrollieUpdate.bind(this);
  }

  onScrollieUpdate(isScrolling) {
    this.setState({
      isScrolling,
    });
  }

  render() {
    const { translations, filteredTranslations } = this.props;
    const { copy, isScrolling } = this.state;

    const renderTranslations = () => {
      if (!translations.length) {
        return (
          <div className="translations__message" data-message-type="no-translations">
            <p className="translations__emoji">{ copy.noTranslationsEmoji }</p>
            <p>{ copy.noTranslationsCopy }</p>
          </div>
        );
      } else if(!filteredTranslations.length) {
        return (
          <div className="translations__message" data-message-type="no-search-results">
            <p className="translations__emoji">{ copy.noResultsEmoji }</p>
            <p>{ copy.noResultsCopy }</p>
          </div>
        );
      }

      return filteredTranslations.map((translation) => {
        return (
          <Translation key={ translation.id } { ...translation } isScrolling={ isScrolling } />
        );
      });
    };

    return (
      <Scrollie onUpdate={ this.onScrollieUpdate }>
        <div className="translations__wrapper">
          <div className={ !translations.length || !filteredTranslations.length ? "translations translations--with-message" : "translations" }>
            <TransitionGroup>
              { renderTranslations() }
            </TransitionGroup>
          </div>
        </div>
      </Scrollie>
    );
  }
}

Dictionary.propTypes = {
  translations: React.PropTypes.array.isRequired,
}

export default connectWithTransitionGroup(connect(
  (state) => state,
  null,
  null,
  // IMPORTANT: must pass this flag to react-redux/connect
  { withRef: true, }
)(GSAP()(Dictionary)));
