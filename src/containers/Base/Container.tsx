import React from 'react';

import { getStyleObject } from 'containers/utils';
import { BASE_SIZE, INNER_BASE_SIZE } from 'globalConstants';
import { IBase } from 'containers/Ludo/state/interfaces';
import { BaseColors } from 'state/interfaces';

import { CoinPlaceholder } from './components/CoinPlaceholder';

import styles from './Container.module.css';

interface IBaseProps {
  base: IBase<BaseColors>;
}

export class Base extends React.PureComponent<IBaseProps> {
  render() {
    const { base: { color } } = this.props;

    return (
      <div className={styles.OuterContainer} style={getStyleObject(BASE_SIZE, BASE_SIZE, color)}>
        <div className={styles.InnerContainer} style={getStyleObject(INNER_BASE_SIZE, INNER_BASE_SIZE)}>
          <CoinPlaceholder baseColor={color}/>
          <CoinPlaceholder baseColor={color}/>
          <CoinPlaceholder baseColor={color}/>
          <CoinPlaceholder baseColor={color}/>
        </div>
      </div>
    );
  }
}
