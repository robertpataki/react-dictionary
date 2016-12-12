import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import { COPY_DOC } from 'copyDoc';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: false,
      copy: COPY_DOC.en.dictionary
    };

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
  }

  onFocus(e) {
    this.setState({
      focus: true,
    });
  }

  onBlur() {
    this.setState({
      focus: false,
    });
  }

  onSearchTextChange() {
    const { dispatch } = this.props;
    const searchText = this.refs.searchText.value;

    dispatch(actions.setSearchText(searchText));
  }

  onCloseClick() {
    const { dispatch } = this.props;
    dispatch(actions.setSearchText(''));
  }

  render() {
    const { dispatch, searchText } = this.props;
    const { copy } = this.state;

    let className = this.state.focus ? "search-bar search-bar--focus" : "search-bar";

    if(searchText.length) {
      className += " search-bar--has-text";
    }

    return (
      <div className={ className }>
        <i className="search-bar__icon search-bar__icon--magnify"></i>
        <input className="search-bar__input" type="text" name="searchText" ref="searchText" placeholder={ copy.search } value={ searchText } onChange={ this.onSearchTextChange } onFocus={ this.onFocus } onBlur={ this.onBlur } />
        <i className="search-bar__icon search-bar__icon--close" onClick={ this.onCloseClick } ></i>
      </div>
    );
  }
}

SearchBar.defaultProps = {
  searchText: '',
};

export default connect(
  (state) => {
    return {
      searchText: state.searchText,
    }
  }
)(SearchBar);
