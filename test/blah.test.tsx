import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Modal from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Modal />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
