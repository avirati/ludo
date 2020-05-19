import React from 'react';

import { getStyleObject } from 'containers/utils';
import { COIN_SIZE } from 'globalConstants';
import { BaseColors } from 'state/interfaces';

import styles from './Coin.module.css';

interface IProps {
  baseColor: BaseColors;
  onCoinClicked: () => void;
}

export class Coin extends React.PureComponent<IProps> {
  render() {
    return (
      <div
        className={styles.Container}
        style={getStyleObject(COIN_SIZE * 0.8, COIN_SIZE * 0.8, this.props.baseColor)}
        onClick={() => this.props.onCoinClicked()}
      />
    );
  }
}
