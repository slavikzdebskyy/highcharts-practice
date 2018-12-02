import React from 'react';
import ReactDOM from 'react-dom';
import AppComponenet from './app.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppComponenet />, div);
  ReactDOM.unmountComponentAtNode(div);
});
