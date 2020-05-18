import React from 'react';

import { getStyleObject } from 'containers/utils';
import { BASE_SIZE, INNER_BASE_SIZE } from 'globalConstants';
import { BaseColors } from 'state/interfaces';

import { CoinPlaceholder } from './components/CoinPlaceholder';

import styles from './Container.module.css';

interface IBaseProps {
  baseColor: BaseColors;
}

export class Base extends React.PureComponent<IBaseProps> {
  render() {
    const { baseColor } = this.props;

    return (
      <div className={styles.OuterContainer} style={getStyleObject(BASE_SIZE, BASE_SIZE, baseColor)}>
        <div className={styles.InnerContainer} style={getStyleObject(INNER_BASE_SIZE, INNER_BASE_SIZE)}>
          <CoinPlaceholder baseColor={baseColor}/>
          <CoinPlaceholder baseColor={baseColor}/>
          <CoinPlaceholder baseColor={baseColor}/>
          <CoinPlaceholder baseColor={baseColor}/>
        </div>
      </div>
    );
  }
}
