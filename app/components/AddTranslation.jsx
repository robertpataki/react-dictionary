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
      <div className="row expanded">
        <div className="container container--footer">
          <form ref="form" onSubmit={ this.onSubmit } className="add-translation">
            <div className="row expanded">
              <h3>Add a new translation</h3>
            </div>
            <div className="row expanded">
              <div className="columns large-4">
                <input type="text" ref="expression" placeholder="Hungarian expression" />
              </div>
              <div className="columns large-4 large-offset-1">
                <input type="text" ref="meaning" placeholder="English meaning" />
              </div>
              <div className="columns large-2">
                <button type="submit" className="button expanded">Add Translation</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(AddTranslation);
