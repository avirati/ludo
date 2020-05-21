import classnames from 'classnames';
import React from 'react';

import { CellType, ICell } from 'containers/Ludo/state/interfaces';
import { getStyleObject } from 'containers/utils';
import { CELL_SIZE, STAR_BASE64 } from 'globalConstants';
import { BaseColors, WalkwayPosition } from 'state/interfaces';

import { IContextMenuOptions } from '../interfaces';
import { generateCellID } from '../utils';

import styles from './Cell.module.css';

interface ICellProps {
  row: number;
  column: number;
  walkwayPosition: WalkwayPosition;
  isStar: boolean;
  cellType: CellType;
  color?: BaseColors;

  onContextMenuOpened: (options: IContextMenuOptions) => void;
  onHighlightNextCells: (cellID: ICell['cellID']) => void;
}

export class Cell extends React.PureComponent<ICellProps> {
  render() {
    const {
      color,
      column,
      cellType,
      row,
      walkwayPosition,
      isStar,
    } = this.props;

    const children = React.Children.map(this.props.children, (child) => child);
    const mutipleCoinClassName = children && children?.length > 1 ? styles.MultipleCoins : null

    return (
      <div
        className={classnames(styles.Container, mutipleCoinClassName)}
        style={{
          ...getStyleObject(CELL_SIZE, CELL_SIZE, color),
          backgroundImage: isStar ? `url(${STAR_BASE64})` : undefined,
        }}
        data-id={generateCellID(walkwayPosition, row, column)}
        data-row={row}
        data-column={column}
        data-position={walkwayPosition}
        data-cell-type={cellType}
        onContextMenu={(event) => this.handleContextMenu(event)}
        onMouseEnter={(event) => this.highlightNextCells(event)}
      >
        {
          children
        }
      </div>
    );
  }

  private handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    this.props.onContextMenuOpened({
      cellID: target.getAttribute('data-id')!,
      cellType: target.getAttribute('data-cell-type') as CellType,
      column: Number(target.getAttribute('data-column')),
      position: target.getAttribute('data-position') as WalkwayPosition,
      row: Number(target.getAttribute('data-row')),
      x: event.clientX,
      y: event.clientY,
    });
  }

  private highlightNextCells = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLDivElement;
    const cellID = target.getAttribute('data-id');
    if (cellID) {
      this.props.onHighlightNextCells(cellID);
    }
  }
}
