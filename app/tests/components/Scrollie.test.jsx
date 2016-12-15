import React from 'react';
import ReactDOM from 'react-dom';

import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import Scrollie from 'Scrollie';

const simulateScrollEvent = function(deltaY) {
  // Faking a scroll event - how do you do this with TestUtils?
  document.body.scrollTop = 100;
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 0 }));
}

describe('Scrollie', () => {
  it('should exist', () => {
    expect(Scrollie).toExist();
  });

  it('should render the children it contains', () => {
    const scrollie = TestUtils.renderIntoDocument(
      <Scrollie>
        <h1>Hello</h1>
        <p>Scrollie!</p>
      </Scrollie> );

    const h1 = TestUtils.findRenderedDOMComponentWithTag(scrollie, 'h1');
    const p = TestUtils.findRenderedDOMComponentWithTag(scrollie, 'p');

    expect(h1).toExist();
    expect(h1.textContent).toBe('Hello');
    expect(p).toExist();
    expect(p.textContent).toBe('Scrollie!');
  });

  it('should call the `onUpdate` method with `true` arg', () => {
    const spy = expect.createSpy();
    const scrollie = TestUtils.renderIntoDocument(<Scrollie onUpdate={ spy } />);

    simulateScrollEvent(100);

    const isScrolling = scrollie.state.isScrolling;
    expect(isScrolling).toBe(true);
    expect(spy).toHaveBeenCalledWith(isScrolling);
  });

  it('should report scrolling false 300 ms after scroll event occurance', (done) => {
    const spy = expect.createSpy();
    const scrollie = TestUtils.renderIntoDocument(<Scrollie onUpdate={ spy } />);
    const delay = Scrollie.TICK + 1;

    simulateScrollEvent(100);

    expect(spy).toHaveBeenCalledWith(true);

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(false);

      done();
    }, delay);
  });

  it('should not handle scrolling when unmounted', () => {
    const spy = expect.createSpy();
    const container = document.createElement('div');
    ReactDOM.render(<Scrollie />, container);
    ReactDOM.unmountComponentAtNode(container);

    simulateScrollEvent(100);
    expect(spy).toNotHaveBeenCalled();
  });
});
