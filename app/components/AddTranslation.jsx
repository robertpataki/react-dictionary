import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class AddTranslation extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const expression = this.refs.expression.value;
    const meaning = this.refs.meaning.value;

    if(expression.length > 0 && meaning.length > 0) {
      this.refs.expression.value = '';
      this.refs.meaning.value = '';

      dispatch(actions.startAddTranslation(expression, meaning));
    }

    this.refs.expression.focus();
  }

  render() {
    return (
      <form ref="form" onSubmit={ this.onSubmit } className="add-translation">
        <h3>Add a new translation</h3>
        <input type="text" ref="expression" placeholder="Hungarian expression" />
        <input type="text" ref="meaning" placeholder="English meaning" />
        <button type="submit" className="button expanded">Add</button>
      </form>
    );
  }
}

export default connect()(AddTranslation);
