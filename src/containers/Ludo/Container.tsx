import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Base } from 'containers/Base/Container';
import { Home } from 'containers/Home/Container';
import { Walkway } from 'containers/Walkway/Container';
import { getStyleObject } from 'containers/utils';
import { BOARD_SIZE } from 'globalConstants';
import { ContextMenu } from 'services/contextMenu/Container';

import { getInitialGameData } from './state/actions';
import { BoardEntities } from './state/interfaces';
import {
  basesSelector,
  relationshipsSelector,
  walkwaysSelector,
} from './state/selectors';

import styles from './Container.module.css';

interface IDispatchProps {
  getInitialGameData: typeof getInitialGameData;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>,
  relationships: ReturnType<typeof relationshipsSelector>,
  walkways: ReturnType<typeof walkwaysSelector>,
}

interface IPublicProps {

}

interface IProps extends IPublicProps, IStateProps, IDispatchProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
  relationships: relationshipsSelector,
  walkways: walkwaysSelector,
})

const mapDispatchToProps = {
  getInitialGameData,
}

class LudoBare extends React.PureComponent<IProps> {
  componentDidMount() {
    this.props.getInitialGameData();
  }

  render() {
    return (
      <div className={styles.Container} style={getStyleObject(BOARD_SIZE, BOARD_SIZE)}>
        {
          this.renderBoardEntities()
        }
        <ContextMenu />
      </div>
    );
  }

  private renderBoardEntities = () => {
    const {
      bases,
      relationships,
      walkways,
    } = this.props;

    return relationships.map((relationship, index) => {
      const base = bases.get(relationship.ID);
      const walkway = walkways.get(relationship.ID);
      switch (relationship.type) {
        case BoardEntities.BASE:
          return <Base base={base!} key={index}/>;
        case BoardEntities.HOME:
          return <Home baseIDs={relationship.baseIDs} key={index}/>;
        case BoardEntities.WALKWAY:
          return <Walkway walkway={walkway!} key={index}/>;
        default:
          return null;
      }
    })
  }
}

export const Ludo = connect(mapStateToProps, mapDispatchToProps)(LudoBare) as unknown as React.ComponentClass<IPublicProps>;
