import React from 'react';

import { getStyleObject } from 'containers/utils';
import { HOME_SIZE } from 'globalConstants';

export class Home extends React.PureComponent {
  render() {
    return (
      <div style={getStyleObject(HOME_SIZE, HOME_SIZE)}/>
    );
  }
}
