import React from 'react';
import { connect } from 'react-redux';

import SearchBar from 'SearchBar';
import UserBar from 'UserBar';

export class AppHeader extends React.Component {
    render() {
      return (
        <header className="app-header">
          <div className="app-header__left">
            <SearchBar />
          </div>
          <div className="app-header__right">
            <UserBar />
          </div>
        </header>
      );
    }
}

export default connect()(AppHeader);
