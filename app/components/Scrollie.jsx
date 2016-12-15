import React from 'react';

export class Scrollie extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      isScrolling: false,
    };

    // Scrolling stuff
    this.handleScroll = this.handleScroll.bind(this);
    this.startScrollTicker = this.startScrollTicker.bind(this);
    this.stopScrollTicker = this.stopScrollTicker.bind(this);
    this.handleScrollTick = this.handleScrollTick.bind(this);
    this.dispatchUpdate = this.dispatchUpdate.bind(this);
  }

  /* Lifecycle hooks */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /* Handling scrolling */
  handleScroll(e) {
    this.setState({
      isScrolling: true,
    });

    this.dispatchUpdate();
    this.startScrollTicker();
  }

  startScrollTicker() {
    this.stopScrollTicker();
    this.ticker = setTimeout(this.handleScrollTick, Scrollie.TICK);
  }

  stopScrollTicker() {
    if (!this.ticker) return;

    clearTimeout(this.ticker);
    this.ticker = undefined;
  }

  handleScrollTick(e) {
    this.setState({
      isScrolling: false,
    });

    this.dispatchUpdate();
  }

  dispatchUpdate() {
    if (!this.props.onUpdate) return;

    const { isScrolling } = this.state;
    this.props.onUpdate(isScrolling);
  }

  render() {
    return (
      <div className="scrollie">
        { this.props.children }
      </div>
    );
  }
}

Scrollie.propTypes = {
  onUpdate: React.PropTypes.func
}

Scrollie.TICK = 300;

export default Scrollie;
