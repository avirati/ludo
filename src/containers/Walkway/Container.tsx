import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getStyleObject } from 'containers/utils';
import { WALKWAY_LENGTH, WALKWAY_WIDTH } from 'globalConstants';
import { WalkwayPosition } from 'state/interfaces';

import { Cell } from './components/Cell';

import { IWalkway } from 'containers/Ludo/state/interfaces';
import { basesSelector } from 'containers/Ludo/state/selectors';

import styles from './Container.module.css';

interface IPublicProps {
  walkway: IWalkway;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
}

interface IProps extends IPublicProps, IStateProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
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
    const { walkway: { position } } = this.props;

    const isHorizontal = this.isHorizontalWalkway();
    const cells = [];

    if (isHorizontal) {
      let count = 0;
      for (let row = 0; row < WALKWAY_WIDTH; row++) {
        for (let column = 0; column < WALKWAY_LENGTH; column++) {
          cells.push(
            <Cell
              key={count++}
              column={column}
              row={row}
              walkwayPosition={position}
            />,
          )
        }
      }
    } else {
      let count = 0;
      for (let row = 0; row < WALKWAY_LENGTH; row++) {
        for (let column = 0; column < WALKWAY_WIDTH; column++) {
          cells.push(
            <Cell
              key={count++}
              column={column}
              row={row}
              walkwayPosition={position}
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
  ].includes(this.props.walkway.position)
}

export const Walkway = connect(mapStateToProps)(WalkwayBare) as unknown as React.ComponentClass<IPublicProps>;
