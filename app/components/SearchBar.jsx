import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
  }

  onSearchTextChange() {
    const { dispatch } = this.props;
    const searchText = this.refs.searchText.value;

    dispatch(actions.setSearchText(searchText));
  }

  render() {
    const { dispatch, searchText } = this.props;

    return (
      <div className="search-bar">
        <i className="search-bar__icon search-bar__icon--magnify"></i>
        <input className="search-bar__input" type="text" name="searchText" ref="searchText" placeholder="Search" value={ searchText } onChange={ this.onSearchTextChange } />
        <i className="search-bar__icon search-bar__icon--close"></i>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      searchText: state.searchText,
    }
  }
)(SearchBar);
