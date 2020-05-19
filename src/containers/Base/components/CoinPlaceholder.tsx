import React from 'react';

import { getStyleObject } from 'containers/utils';
import { COIN_PLACEHOLDER_SIZE, COIN_SIZE } from 'globalConstants';
import { BaseColors } from 'state/interfaces';

import { Coin } from './Coin';

import styles from './CoinPlaceholder.module.css';

interface ICoinPlaceholderProps {
  baseColor: BaseColors;
  onCoinClicked: () => void;
}

export class CoinPlaceholder extends React.PureComponent<ICoinPlaceholderProps> {
  render() {
    const { baseColor } = this.props;
    return (
      <div className={styles.Container} style={getStyleObject(COIN_PLACEHOLDER_SIZE, COIN_PLACEHOLDER_SIZE)}>
        <div className={styles.Circle} style={getStyleObject(COIN_SIZE, COIN_SIZE, baseColor)}>
          <Coin baseColor={baseColor} onCoinClicked={() => this.props.onCoinClicked()}/>
        </div>
      </div>
    );
  }
}
