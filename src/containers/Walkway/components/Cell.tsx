import React from 'react';

import { getStyleObject } from 'containers/utils';
import { CELL_SIZE } from 'globalConstants';

import { WalkwayPosition } from 'state/interfaces';

import styles from './Cell.module.css';

interface ICellProps {
  row: number;
  column: number;
  walkwayPosition: WalkwayPosition;
}

export class Cell extends React.PureComponent<ICellProps> {
  render() {
    const { column, row, walkwayPosition } = this.props;
    return (
      <div
        className={styles.Container}
        style={getStyleObject(CELL_SIZE, CELL_SIZE)}
        data-row={row}
        data-column={column}
        data-position={walkwayPosition}
      />
    );
  }
}
