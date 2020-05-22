import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Base } from 'containers/Base/Container';
import { Home } from 'containers/Home/Container';
import { Player } from 'containers/Player/Container';
import { Walkway } from 'containers/Walkway/Container';
import { getStyleObject } from 'containers/utils';
import { BOARD_SIZE } from 'globalConstants';
import { ContextMenu } from 'services/contextMenu/Container';

import { getInitialGameData } from './state/actions';
import { BaseID, BoardEntities } from './state/interfaces';
import {
  basesSelector,
  currentTurnSelector,
  relationshipsSelector,
  walkwaysSelector,
} from './state/selectors';

import styles from './Container.module.css';

interface IDispatchProps {
  getInitialGameData: typeof getInitialGameData;
}

interface IStateProps {
  bases: ReturnType<typeof basesSelector>;
  relationships: ReturnType<typeof relationshipsSelector>;
  walkways: ReturnType<typeof walkwaysSelector>;
  currentTurn: ReturnType<typeof currentTurnSelector>;
}

interface IPublicProps {

}

interface IProps extends IPublicProps, IStateProps, IDispatchProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
  currentTurn: currentTurnSelector,
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
    const { bases, currentTurn } = this.props;
    return (
      <div className={styles.Container}>
        <div className={styles.PlayerContainer}>
          <Player base={bases[BaseID.BASE_1]} placement='top' disabled={currentTurn !== BaseID.BASE_1}/>
          <Player base={bases[BaseID.BASE_3]} placement='bottom' disabled={currentTurn !== BaseID.BASE_3}/>
        </div>
        <div className={styles.Board} style={getStyleObject(BOARD_SIZE, BOARD_SIZE)}>
          {
            this.renderBoardEntities()
          }
        </div>
        <div className={styles.PlayerContainer}>
          <Player base={bases[BaseID.BASE_2]} placement='top' disabled={currentTurn !== BaseID.BASE_2}/>
          <Player base={bases[BaseID.BASE_4]} placement='bottom' disabled={currentTurn !== BaseID.BASE_4}/>
        </div>
        {
          process.env.NODE_ENV === 'development'
          ? <ContextMenu />
          : null
        }
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
      const base = bases[relationship.ID];
      const walkway = walkways[relationship.ID];
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
