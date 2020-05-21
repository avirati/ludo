import classnames from 'classnames';
import { integer, MersenneTwister19937 } from 'random-js';
import React from 'react';

import { getStyleObject } from 'containers/utils';
import { DICE_SIZE } from 'globalConstants';

import styles from './Container.module.css';

enum Rolls {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
}

const CONFIGURATIONS = {
  [Rolls.ONE]: [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0,
  ],
  [Rolls.TWO]: [
    0, 0, 1,
    0, 0, 0,
    1, 0, 0,
  ],
  [Rolls.THREE]: [
    0, 0, 1,
    0, 1, 0,
    1, 0, 0,
  ],
  [Rolls.FOUR]: [
    1, 0, 1,
    0, 0, 0,
    1, 0, 1,
  ],
  [Rolls.FIVE]: [
    1, 0, 1,
    0, 1, 0,
    1, 0, 1,
  ],
  [Rolls.SIX]: [
    1, 1, 1,
    0, 0, 0,
    1, 1, 1,
  ],
}

interface IState {
  currentRoll: Rolls;
}

export class Dice extends React.PureComponent<{}, IState> {
  state = { currentRoll: Rolls.SIX }

  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.Die} style={getStyleObject(DICE_SIZE, DICE_SIZE)} onClick={() => this.rollDie()}>
          {
            this.renderDots()
          }
        </div>
      </div>
    );
  }

  private renderDots = () => {
    const elements: any[] = [];
    const configurationForCurrentRoll = CONFIGURATIONS[this.state.currentRoll];

    for (let i = 0; i < configurationForCurrentRoll.length; i++) {
      const isVisible = Boolean(configurationForCurrentRoll[i]);
      const classNames = isVisible ? styles.Dot : [styles.Dot, styles.Invisible];
      elements.push(
        <div className={classnames(classNames)} key={i}/>,
      )
    }

    return elements;
  }

  private rollDie = () => {
    const mt = MersenneTwister19937.autoSeed();
    this.setState({
      currentRoll: integer(1, 6)(mt),
    });
  }
}
