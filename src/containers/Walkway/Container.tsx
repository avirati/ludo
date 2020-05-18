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
    const isHorizontal = this.isHorizontalWalkway();

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
    const isHorizontal = this.isHorizontalWalkway();
    const cells = [];

    if (isHorizontal) {
      for (let row = 0; row < WALKWAY_WIDTH; row++) {
        for (let column = 0; column < WALKWAY_LENGTH; column++) {
          cells.push(
            <Cell
              column={column}
              row={row}
              walkwayPosition={this.props.position}
            />,
          )
        }
      }
    } else {
      for (let row = 0; row < WALKWAY_LENGTH; row++) {
        for (let column = 0; column < WALKWAY_WIDTH; column++) {
          cells.push(
            <Cell
              column={column}
              row={row}
              walkwayPosition={this.props.position}
            />,
          )
        }
      }
    }

    return cells;
  }

  private isHorizontalWalkway = () => [
    WalkwayPosition.EAST,
    WalkwayPosition.WEST,
  ].includes(this.props.position)
}
