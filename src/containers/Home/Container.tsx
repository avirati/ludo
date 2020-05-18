import React from 'react';

import { HOME_SIZE } from 'globalConstants';
import { getStyleObject } from 'utils';

export class Home extends React.PureComponent {
  render() {
    return (
      <div style={getStyleObject(HOME_SIZE, HOME_SIZE)}/>
    );
  }
}
