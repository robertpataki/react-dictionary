import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class TodoSearch extends React.Component {
  constructor(props) {
    super(props);

    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onShowCompleteCheckboxChange = this.onShowCompleteCheckboxChange.bind(this);
  }

  onShowCompleteCheckboxChange() {
    const { dispatch } = this.props;
    dispatch(actions.toggleShowCompleted());
  }

  onSearchTextChange() {
    const { dispatch } = this.props;
    const searchText = this.refs.searchText.value;
    dispatch(actions.setSearchText(searchText));
  }

  render() {
    const { dispatch, showCompleted, searchText } = this.props;

    return (
      <div className="container__header">
        <div>
          <input type="text" name="searchText" ref="searchText" placeholder="Ener keyword" value={ searchText } onChange={ this.onSearchTextChange } />
        </div>
        <div>
          <label><input type="checkbox" name="showCompleted" ref="showCompleted" defaultChecked={ showCompleted } onChange={ this.onShowCompleteCheckboxChange } />Show Completed Todos</label>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText,
    }
  }
)(TodoSearch);
