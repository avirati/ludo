import React from 'react';

import { getStyleObject } from 'containers/utils';
import { CELL_SIZE } from 'globalConstants';
import { BaseColors, WalkwayPosition } from 'state/interfaces';

import { IContextMenuOptions } from '../interfaces';
import { generateCellID } from '../utils';

import styles from './Cell.module.css';

interface ICellProps {
  row: number;
  column: number;
  walkwayPosition: WalkwayPosition;
  color?: BaseColors;

  onContextMenuOpened: (options: IContextMenuOptions) => void;
}

export class Cell extends React.PureComponent<ICellProps> {
  render() {
    const {
      color,
      column,
      row,
      walkwayPosition,
    } = this.props;
    return (
      <div
        className={styles.Container}
        style={getStyleObject(CELL_SIZE, CELL_SIZE, color)}
        data-id={generateCellID(walkwayPosition, row, column)}
        data-row={row}
        data-column={column}
        data-position={walkwayPosition}
        onContextMenu={(event) => this.handleContextMenu(event)}
      />
    );
  }

  private handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    this.props.onContextMenuOpened({
      cellID: target.getAttribute('data-id')!,
      column: Number(target.getAttribute('data-column')),
      position: target.getAttribute('data-position') as WalkwayPosition,
      row: Number(target.getAttribute('data-row')),
      x: event.clientX,
      y: event.clientY,
    });
  }
}
