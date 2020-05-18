import React from 'react';

import { getStyleObject } from 'containers/utils';
import { WALKWAY_LENGTH, WALKWAY_WIDTH } from 'globalConstants';
import { WalkwayPosition } from 'state/interfaces';

import { Cell } from './components/Cell';

import styles from './Container.module.css';

interface IWalkwayProps {
  position: WalkwayPosition;
}

export class Walkway extends React.PureComponent<IWalkwayProps> {
  render() {
    const { position } = this.props;
    const isHorizontal = [
      WalkwayPosition.EAST,
      WalkwayPosition.WEST,
    ].includes(position);

    return (
      <div
        className={styles.Container}
        style={
          isHorizontal
          ? getStyleObject(WALKWAY_LENGTH, WALKWAY_WIDTH)
          : getStyleObject(WALKWAY_WIDTH, WALKWAY_LENGTH)
        }
      >
        {
          this.renderCells()
        }
      </div>
    );
  }

  private renderCells = () => {
    const cells = [];

    for (let i = 0; i < WALKWAY_LENGTH * WALKWAY_WIDTH; i++) {
      cells.push(
        <Cell key={i}/>,
      )
    }

    return cells;
  }
}
