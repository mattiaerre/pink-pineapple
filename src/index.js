import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/App';
import Wrapper from './containers/App/Wrapper';

render(
  <div>
    <Wrapper>
      <App model={{ title: 'OpenComponents Registry v2' }} />
    </Wrapper>
  </div>,
  document.getElementById('app')
);
