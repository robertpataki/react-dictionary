import React from 'react';
import { connect } from 'react-redux';

import UserBar from 'UserBar';
import TranslationSearch from 'TranslationSearch';
import TodoList from 'TodoList';
import AddTodo from 'AddTodo';

export class DictionaryApp extends React.Component {
  render() {
    return (
      <section>
        <UserBar />

        <div>
          <TranslationSearch />
          <TodoList />
          <AddTodo />
        </div>
      </section>
    );
  }
}

export default connect()(DictionaryApp);
