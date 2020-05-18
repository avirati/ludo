import React from 'react';

import { COIN_PLACEHOLDER_SIZE, COIN_SIZE } from 'globalConstants';
import { BaseColors } from 'interfaces';
import { getStyleObject } from 'utils';

import styles from './CoinPlaceholder.module.css';

interface ICoinPlaceholderProps {
  baseColor: BaseColors;
}

export class CoinPlaceholder extends React.PureComponent<ICoinPlaceholderProps> {
  render() {
    const { baseColor } = this.props;
    return (
      <div className={styles.Container} style={getStyleObject(COIN_PLACEHOLDER_SIZE)}>
        <div className={styles.Circle} style={getStyleObject(COIN_SIZE, baseColor)}/>
      </div>
    );
  }
}
