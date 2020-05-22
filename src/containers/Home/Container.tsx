import React from 'react';

import { IRelationship } from 'containers/Ludo/state/interfaces';
import { basesSelector } from 'containers/Ludo/state/selectors';
import { getBaseHexColor, getStyleObject } from 'containers/utils';
import { CELL_DIMENSION, HOME_SIZE } from 'globalConstants';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { BaseColors } from 'state/interfaces';

import styles from './Container.module.css';

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
}

interface IPublicProps {
  baseIDs: IRelationship['baseIDs'];
}

interface IProps extends IStateProps, IPublicProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
});

class HomeBare extends React.PureComponent<IProps> {
  render() {
    const { baseIDs, bases } = this.props;
    return (
      <div className={styles.Container} style={getStyleObject(HOME_SIZE, HOME_SIZE)}>
        {
          baseIDs!.map((baseID, index) => {
            const base = bases[baseID];
            return (
              <div key={index} className={styles.HomeContainer} style={this.getCSS(HOME_SIZE, base.color, index)} />
            );
          })
        }
      </div>
    );
  }

  private getCSS = (
    cellSize: number,
    baseColor: BaseColors,
    index: number,
  ): React.CSSProperties => {
    const size = cellSize * CELL_DIMENSION;
    const colorHex = getBaseHexColor(baseColor!);

    const cssProperties = {
      borderColor: `${colorHex} transparent transparent transparent`,
      borderWidth: `${size / 2}px ${size / 2}px 0 ${size / 2}px`,
    };

    switch (index) {
      case 0:
        return cssProperties;
      case 1:
        return {
          ...cssProperties,
          left: `${size / 4}px`,
          top: `${size / 4}px`,
          transform: 'rotate(90deg)',
        };
      case 2:
        return {
          ...cssProperties,
          top: `${size / 2}px`,
          transform: 'rotate(180deg)',
        };
      case 3:
        return {
          ...cssProperties,
          right: `${size / 4}px`,
          top: `${size / 4}px`,
          transform: 'rotate(-90deg)',
        };
      default:
        return {};
    }
  }
}

export const Home = connect(mapStateToProps)(HomeBare) as unknown as React.ComponentClass<IPublicProps>;
