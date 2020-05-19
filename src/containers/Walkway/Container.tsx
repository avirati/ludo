import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { flatArray } from 'common/utils';
import { CellType, ICell, IWalkway } from 'containers/Ludo/state/interfaces';
import { basesSelector, cellsSelector } from 'containers/Ludo/state/selectors';
import { getStyleObject } from 'containers/utils';
import { WALKWAY_LENGTH, WALKWAY_WIDTH } from 'globalConstants';
import { hideContextMenu, showContextMenu } from 'services/contextMenu/service';
import { WalkwayPosition } from 'state/interfaces';

import { Cell } from './components/Cell';
import { IContextMenuOptions } from './interfaces';

import styles from './Container.module.css';
import { generateCellID } from './utils';

interface IPublicProps {
  walkway: IWalkway;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
  cells: ReturnType<typeof cellsSelector>;
}

interface IProps extends IPublicProps, IStateProps {}

const cells: { [walkwayPosition: string] : { [cellID: string]: ICell } } = {};

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
  cells: cellsSelector,
})

class WalkwayBare extends React.PureComponent<IProps> {
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
    const { walkway: { position, baseID }, cells: cellConfigurations, bases } = this.props;

    const cellComponents: any[][] = [[]];

    const cellConfigurationsForWalkway = Object.values(cellConfigurations[position]);
    const base = bases.get(baseID);

    cellConfigurationsForWalkway.forEach((cellConfiguration, index) => {
      const { row, column, position } = cellConfiguration;
      const cellType = cellConfigurations[position][generateCellID(position, row, column)].type;
      cellComponents[cellConfiguration.row] = cellComponents[cellConfiguration.row] || [];
      cellComponents[cellConfiguration.row][cellConfiguration.column] =
      <Cell
        key={index}
        column={column}
        row={row}
        walkwayPosition={position}
        onContextMenuOpened={this.onContextMenuOpened}
        color={[CellType.HOMEPATH, CellType.SPAWN].includes(cellType) ? base!.color : undefined}
        isStar={cellType === CellType.STAR}
      />;
    });

    return flatArray(cellComponents)
  }

  private isHorizontalWalkway = () => [
    WalkwayPosition.EAST,
    WalkwayPosition.WEST,
  ].includes(this.props.walkway.position)

  private onContextMenuOpened = (options: IContextMenuOptions) => {
    const { walkway: { baseID } } = this.props;
    const {
      cellID,
      column,
      position,
      row,
      x,
      y,
    } = options;
    const cellInfo: Omit<ICell, 'type'> = {
      baseID,
      cellID,
      column,
      position,
      row,
    }
    showContextMenu(
      x,
      y,
      [{
        action: () => this.markCells({ ...cellInfo, type: CellType.NORMAL }),
        label: CellType.NORMAL,
      }, {
        action: () => this.markCells({ ...cellInfo, type: CellType.SPAWN }),
        label: CellType.SPAWN,
      }, {
        action: () => this.markCells({ ...cellInfo, type: CellType.STAR }),
        label: CellType.STAR,
      }, {
        action: () => this.markCells({ ...cellInfo, type: CellType.HOMEPATH }),
        label: CellType.HOMEPATH,
      }],
    );
  }

  private markCells = (cellInfo: ICell) => {
    cells[cellInfo.position] = cells[cellInfo.position] || {};
    cells[cellInfo.position][cellInfo.cellID] = cellInfo;
    hideContextMenu();
    console.log(JSON.stringify(cells));
  }
}

export const Walkway = connect(mapStateToProps)(WalkwayBare) as unknown as React.ComponentClass<IPublicProps>;
