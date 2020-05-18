import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Base } from 'containers/Base/Container';
import { Home } from 'containers/Home/Container';
import { Walkway } from 'containers/Walkway/Container';
import { getStyleObject } from 'containers/utils';
import { BOARD_SIZE } from 'globalConstants';
import { BaseColors, WalkwayPosition } from 'state/interfaces';

import { getInitialGameData } from './state/actions';
import { initialGameDataSelector } from './state/selectors';

import styles from './Container.module.css';

interface IDispatchProps {
  getInitialGameData: typeof getInitialGameData;
}

interface IStateProps {
  initialGameData: any;
}

interface IPublicProps {

}

interface IProps extends IPublicProps, IStateProps, IDispatchProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  initialGameData: initialGameDataSelector,
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
        <Base baseColor={BaseColors.GREEN}/>
        <Walkway position={WalkwayPosition.NORTH}/>
        <Base baseColor={BaseColors.RED}/>
        <Walkway position={WalkwayPosition.EAST}/>

        <Home />

        <Walkway position={WalkwayPosition.WEST}/>
        <Base baseColor={BaseColors.YELLOW}/>
        <Walkway position={WalkwayPosition.SOUTH}/>
        <Base baseColor={BaseColors.BLUE}/>
      </div>
    );
  }
}

export const Ludo = connect(mapStateToProps, mapDispatchToProps)(LudoBare) as unknown as React.ComponentClass<IPublicProps>;
