import React from 'react';

import { IBase, ICoin } from 'containers/Ludo/state/interfaces';
import { getStyleObject } from 'containers/utils';
import { BASE_SIZE, INNER_BASE_SIZE } from 'globalConstants';

import { CoinPlaceholder } from './components/CoinPlaceholder';

import styles from './Container.module.css';

interface IBaseProps {
  base: IBase;
}

export class Base extends React.PureComponent<IBaseProps> {
  render() {
    const { base } = this.props;

    return (
      <div className={styles.OuterContainer} style={getStyleObject(BASE_SIZE, BASE_SIZE, base.color)}>
        <div className={styles.InnerContainer} style={getStyleObject(INNER_BASE_SIZE, INNER_BASE_SIZE)}>
          {
            base.coins.map((coin, index) => {
              return coin.isRetired
              ? null
              : (
                <CoinPlaceholder
                  key={index}
                  baseColor={base.color}
                  onCoinClicked={() => this.onCoinClicked(base, coin)}
                />
              )
            })
          }
        </div>
      </div>
    );
  }

  private onCoinClicked = (base: IBase, coin: ICoin) => {
    console.log(base, coin);
  }
}
