import React from 'react';
import { create } from 'react-test-renderer';
// import { matcher, serializer } from 'jest-styled-components';
import Wrapper from './Wrapper';

// expect.extend(matcher);
// expect.addSnapshotSerializer(serializer);

test('Wrapper', () => {
  const tree = create(<Wrapper />).toJSON();
  expect(tree).toMatchSnapshot();
});
