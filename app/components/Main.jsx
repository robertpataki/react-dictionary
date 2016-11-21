import React from 'react';

export class Main extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

export default Main;
