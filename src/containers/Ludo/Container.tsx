import React from 'react';

import { Base } from 'containers/Base/Container';
import { Home } from 'containers/Home/Container';
import { Walkway } from 'containers/Walkway/Container';
import { getStyleObject } from 'containers/utils';
import { BOARD_SIZE } from 'globalConstants';
import { BaseColors, WalkwayPosition } from 'state/interfaces';

import styles from './Container.module.css';

export class Ludo extends React.PureComponent {
  render() {
    return (
      <div className={styles.Container} style={getStyleObject(BOARD_SIZE, BOARD_SIZE)}>
        <Base baseColor={BaseColors.GREEN}/>
        <Walkway position={WalkwayPosition.NORTH}/>
        <Base baseColor={BaseColors.RED}/>
        <Walkway position={WalkwayPosition.EAST}/>

        <Home />

        <Walkway position={WalkwayPosition.WEST}/>
        <Base baseColor={BaseColors.YELLOW}/>
        <Walkway position={WalkwayPosition.SOUTH}/>
        <Base baseColor={BaseColors.BLUE}/>
      </div>
    );
  }
}
