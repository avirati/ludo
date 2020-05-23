import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Coin } from 'containers/Base/components/Coin';
import { Dice } from 'containers/Dice/Container';
import { IBase } from 'containers/Ludo/state/interfaces';
import { basesSelector, coinsSelector } from 'containers/Ludo/state/selectors';
import { PlayerAvatar } from './components/PlayerAvatar';

import styles from './Container.module.css';

interface IPublicProps {
  baseID: IBase['ID'];
  placement: 'top' | 'bottom';
  disabled: boolean;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
  coins: ReturnType<typeof coinsSelector>;
}

interface IProps extends IStateProps, IPublicProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
  coins: coinsSelector,
});

class PlayerBare extends React.PureComponent<IProps> {
  render() {
    const { baseID, bases, placement, disabled } = this.props;
    const placementClass = placement === 'top' ? styles.TopPlacement : styles.BottomPlacement;
    const disabledClass = disabled ? styles.Disabled : null;
    const base = bases[baseID];
    return base && base.enabled
    ? (
      <div className={classnames(styles.Container, placementClass, disabledClass)}>
        <PlayerAvatar baseColor={base.color}/>
        {
          !disabled && <Dice baseColor={base.color}/>
        }
        <div className={styles.RetiredCoins}>
        {
          base.coinIDs
          .filter((coinID) => this.props.coins[coinID].isRetired)
          .map((coin, index) => (
            <Coin
              baseColor={base.color}
              onCoinClicked={() => null}
              key={index}
            />
          ))
        }
        </div>
      </div>
    )
    : null;
  }
}

export const Player = connect(mapStateToProps)(PlayerBare) as unknown as React.ComponentClass<IPublicProps>;
