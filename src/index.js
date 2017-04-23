import React from 'react';
import { render } from 'react-dom';
import { RENDERED } from './constants';
import App from './containers/App/App';
import Wrapper from './containers/App/Wrapper';

const features = {};
features[RENDERED] = document.getElementsByTagName('body')[0].getAttribute('class').includes(`ft-${RENDERED}`);

render(
  <div>
    <Wrapper>
      <App model={{ title: 'OpenComponents Registry v2' }} features={features} />
    </Wrapper>
  </div>,
  document.getElementById('app')
);
