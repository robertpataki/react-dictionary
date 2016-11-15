const React = require('react');
const {connect} = require('react-redux');
const actions = require('actions');

export var TranslationSearch = React.createClass({
  render: function () {
    var {dispatch, searchText} = this.props;

    return (
      <div className="container__header">
        <div>
          <input type="text" name="searchText" ref="searchText" placeholder="Ener keyword" value={searchText} onChange={() => {
            var searchText = this.refs.searchText.value;
            dispatch(actions.setSearchText(searchText));
          }} />
        </div>
      </div>
    );
  }
});

export default connect(
  (state) => {
    return {
      searchText: state.searchText
    }
  }
)(TranslationSearch);
