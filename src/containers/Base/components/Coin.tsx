import React from 'react';

import { getStyleObject } from 'containers/utils';
import { COIN_SIZE } from 'globalConstants';
import { BaseColors } from 'state/interfaces';

import styles from './Coin.module.css';

interface IProps {
  baseColor: BaseColors;
  coinSize?: number;
  onCoinClicked: () => void;
}

export class Coin extends React.PureComponent<IProps> {
  render() {
    const { coinSize = COIN_SIZE } = this.props;
    return (
      <div
        className={styles.Container}
        style={getStyleObject(coinSize * 0.8, coinSize * 0.8, this.props.baseColor)}
        onClick={() => this.props.onCoinClicked()}
      />
    );
  }
}
