import classnames from 'classnames';
import React from 'react';

import { Dice } from 'containers/Dice/Container';

import { BaseColors } from 'state/interfaces';
import { PlayerAvatar } from './components/PlayerAvatar';

import styles from './Container.module.css';

interface IProps {
  baseColor: BaseColors;
  placement: 'top' | 'bottom';
}

export class Player extends React.PureComponent<IProps> {
  render() {
    const { baseColor, placement } = this.props;
    const placementClass = placement === 'top' ? styles.TopPlacement : styles.BottomPlacement;
    return (
      <div className={classnames(styles.Container, placementClass)}>
        <PlayerAvatar baseColor={baseColor}/>
        <Dice baseColor={baseColor}/>
      </div>
    );
  }
}
