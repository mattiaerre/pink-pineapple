import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import App from './containers/App/App';

const Wrapper = styled.div`
  font-family: Consolas, monaco, monospace;
  padding: 2em;
  table {
    padding: 2em;
    border-collapse: collapse;
    border: 1px solid gray;
  }
  tbody tr:nth-child(odd) {
    background: lightpink;
  }
  tbody tr:nth-child(even) {
    background: papayawhip;
  }
  th, td {
    padding: 1em;
    border: 0px;
  }
`;

render(
  <div>
    <Wrapper>
      <App model={{ title: 'OpenComponents Registry v2' }} />
    </Wrapper>
  </div>,
  document.getElementById('app')
);
