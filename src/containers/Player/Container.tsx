import classnames from 'classnames';
import React from 'react';

import { Dice } from 'containers/Dice/Container';

import { IBase } from 'containers/Ludo/state/interfaces';
import { PlayerAvatar } from './components/PlayerAvatar';

import styles from './Container.module.css';

interface IProps {
  base: IBase;
  placement: 'top' | 'bottom';
  disabled: boolean;
}

export class Player extends React.PureComponent<IProps> {
  render() {
    const { base, placement, disabled } = this.props;
    const placementClass = placement === 'top' ? styles.TopPlacement : styles.BottomPlacement;
    const disabledClass = disabled ? styles.Disabled : null;
    return base
    ? (
      <div className={classnames(styles.Container, placementClass, disabledClass)}>
        <PlayerAvatar baseColor={base.color}/>
        {
          !disabled && <Dice baseColor={base.color}/>
        }
      </div>
    )
    : null
  }
}
