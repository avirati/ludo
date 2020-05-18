import React from 'react';

import { WALKWAY_LENGTH, WALKWAY_WIDTH } from 'globalConstants';
import { WalkwayPosition } from 'interfaces';
import { getStyleObject } from 'utils';

import styles from './Container.module.css';

interface IWalkwayProps {
  position: WalkwayPosition;
}

export class Walkway extends React.PureComponent<IWalkwayProps> {
  render() {
    const { position } = this.props;
    return (
      <div
        className={styles.Container}
        style={
          [
            WalkwayPosition.EAST,
            WalkwayPosition.WEST,
          ].includes(position)
          ? getStyleObject(WALKWAY_LENGTH, WALKWAY_WIDTH)
          : getStyleObject(WALKWAY_WIDTH, WALKWAY_LENGTH)
        }
      />
    );
  }
}
