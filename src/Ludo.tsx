import React from 'react';

import { Base } from 'containers/Base/Container';
import { BaseColors } from 'interfaces';

import { BOARD_SIZE } from './globalConstants';
import { getStyleObject } from './utils';

import styles from './Ludo.module.css';

export class Ludo extends React.PureComponent {
  render() {
    return (
      <div className={styles.Container} style={getStyleObject(BOARD_SIZE)}>
        <Base baseColor={BaseColors.RED}/>
      </div>
    );
  }
}
