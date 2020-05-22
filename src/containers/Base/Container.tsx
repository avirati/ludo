import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';

import { spawnCoin } from 'containers/Ludo/state/actions';
import { IBase, ICoin } from 'containers/Ludo/state/interfaces';
import { getStyleObject } from 'containers/utils';
import { BASE_SIZE, INNER_BASE_SIZE } from 'globalConstants';

import { CoinPlaceholder } from './components/CoinPlaceholder';

import styles from './Container.module.css';

interface IPublicProps {
  base: IBase;
}

interface IDispatchProps {
  spawnCoin: typeof spawnCoin;
}

interface IProps extends IPublicProps, IDispatchProps {}

const mapDispatchToProps = {
  spawnCoin,
}

class BaseBare extends React.PureComponent<IProps> {
  render() {
    const { base } = this.props;

    const spawnableClass = base.spawnable ? styles.Spawnable : null;

    return (
      <div className={styles.OuterContainer} style={getStyleObject(BASE_SIZE, BASE_SIZE, base.color)}>
        <div className={classnames(styles.InnerContainer, spawnableClass)} style={getStyleObject(INNER_BASE_SIZE, INNER_BASE_SIZE)}>
          {
            base.coins.map((coin, index) => {
              return (
                <CoinPlaceholder
                  key={index}
                  baseColor={base.color}
                  isCoinHidden={coin.isSpawned || coin.isRetired}
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
    if (base.spawnable) {
      this.props.spawnCoin(base.ID, coin.coinID);
    }
  }
}

export const Base = connect(null, mapDispatchToProps)(BaseBare) as unknown as React.ComponentClass<IPublicProps>;
