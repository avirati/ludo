import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isDieRollValidSelector } from 'containers/Dice/state/selectors';
import { spawnCoin } from 'containers/Ludo/state/actions';
import { IBase, ICoin } from 'containers/Ludo/state/interfaces';
import { basesSelector, coinsSelector } from 'containers/Ludo/state/selectors';
import { getStyleObject } from 'containers/utils';
import { BASE_SIZE, INNER_BASE_SIZE } from 'globalConstants';

import { CoinPlaceholder } from './components/CoinPlaceholder';

import styles from './Container.module.css';

interface IPublicProps {
  baseID: IBase['ID'];
  enabled: boolean;
  hasWon: boolean;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
  coins: ReturnType<typeof coinsSelector>;
  isDieRollValid: ReturnType<typeof isDieRollValidSelector>;
}

interface IDispatchProps {
  spawnCoin: typeof spawnCoin;
}

interface IProps extends IPublicProps, IDispatchProps, IStateProps {}

const mapDispatchToProps = {
  spawnCoin,
};

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
  coins: coinsSelector,
  isDieRollValid: isDieRollValidSelector,
});

class BaseBare extends React.PureComponent<IProps> {
  render() {
    const { baseID, bases } = this.props;
    const base = bases[baseID];
    const spawnableClass = base.spawnable ? styles.Spawnable : null;

    return (
      <div className={styles.OuterContainer} style={getStyleObject(BASE_SIZE, BASE_SIZE, base.color)}>
        <div className={classnames(styles.InnerContainer, spawnableClass)} style={getStyleObject(INNER_BASE_SIZE, INNER_BASE_SIZE)}>
          {
            base.coinIDs.map((coinID, index) => {
              const coin = this.props.coins[coinID];
              return (
                <CoinPlaceholder
                  key={index}
                  baseColor={base.color}
                  isCoinHidden={!this.props.enabled || (coin.isSpawned || coin.isRetired)}
                  onCoinClicked={() => this.onCoinClicked(base, coin)}
                />
              );
            })
          }
        </div>
      </div>
    );
  }

  private onCoinClicked = (base: IBase, coin: ICoin) => {
    if (base.spawnable && this.props.isDieRollValid) {
      this.props.spawnCoin(base.ID, coin.coinID);
    }
  }
}

export const Base = connect(mapStateToProps, mapDispatchToProps)(BaseBare) as unknown as React.ComponentClass<IPublicProps>;
