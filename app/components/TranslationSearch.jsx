import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class TranslationSearch extends React.Component {
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
      <div className="row expanded">
        <div className="container container--header">
          <h3>Find translation</h3>
          <input type="text" name="searchText" ref="searchText" placeholder="Enter keyword" value={ searchText } onChange={ this.onSearchTextChange } />
        </div>
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
)(TranslationSearch);
