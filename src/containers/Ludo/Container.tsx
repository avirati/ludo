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

import { getInitialGameData, setPlayers } from './state/actions';
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
  setPlayers: typeof setPlayers;
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

interface IState {
  showPlayerConfiguration: boolean;
}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  bases: basesSelector,
  currentTurn: currentTurnSelector,
  relationships: relationshipsSelector,
  walkways: walkwaysSelector,
});

const mapDispatchToProps = {
  setPlayers,
  getInitialGameData,
};

class LudoBare extends React.PureComponent<IProps, IState> {
  state: IState = { showPlayerConfiguration: true }

  componentDidMount() {
    this.props.getInitialGameData();
  }

  render() {
    const { currentTurn } = this.props;
    return (
      <div className={styles.Container}>
        <div className={styles.GameContainer}>
          <div className={styles.PlayerContainer}>
            <Player baseID={BaseID.BASE_1} placement='top' disabled={currentTurn !== BaseID.BASE_1}/>
            <Player baseID={BaseID.BASE_3} placement='bottom' disabled={currentTurn !== BaseID.BASE_3}/>
          </div>
          <div className={styles.Board} style={getStyleObject(BOARD_SIZE, BOARD_SIZE)}>
            {
              this.renderBoardEntities()
            }
          </div>
          <div className={styles.PlayerContainer}>
            <Player baseID={BaseID.BASE_2} placement='top' disabled={currentTurn !== BaseID.BASE_2}/>
            <Player baseID={BaseID.BASE_4} placement='bottom' disabled={currentTurn !== BaseID.BASE_4}/>
          </div>
        </div>
        {
          this.state.showPlayerConfiguration
          ? (
            <div className={styles.GameConfiguration}>
            <button className={styles.Button} onClick={() => this.startGame(2)}>2 Players</button>
            <button className={styles.Button} onClick={() => this.startGame(3)}>3 Players</button>
            <button className={styles.Button} onClick={() => this.startGame(4)}>4 Players</button>
          </div>
          )
          : null
        }
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
          return <Base baseID={base.ID} key={index} enabled={base.enabled} hasWon={base.hasWon}/>;
        case BoardEntities.HOME:
          return <Home baseIDs={relationship.baseIDs} key={index}/>;
        case BoardEntities.WALKWAY:
          return <Walkway walkway={walkway!} key={index}/>;
        default:
          return null;
      }
    });
  }

  private startGame = (playerCount: number) => {
    this.props.setPlayers(playerCount);
    this.setState({
      showPlayerConfiguration: false,
    });
  }
}

export const Ludo = connect(mapStateToProps, mapDispatchToProps)(LudoBare) as unknown as React.ComponentClass<IPublicProps>;
