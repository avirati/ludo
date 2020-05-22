import classnames from 'classnames';
import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getStyleObject } from 'containers/utils';
import { DICE_SIZE } from 'globalConstants';

import { rollDie } from './state/actions';
import { CONFIGURATIONS } from './state/constants';
import { Rolls } from './state/interfaces';
import { currentDieRollSelector, isDieRollAllowedSelector } from './state/selectors';

import styles from './Container.module.css';

interface IStateProps {
  currentDieRoll: ReturnType<typeof currentDieRollSelector>;
  isDieRollAllowed: ReturnType<typeof isDieRollAllowedSelector>;
}

interface IDispatchProps {
  rollDie: typeof rollDie,
}

interface IProps extends IStateProps, IDispatchProps {}

const mapStateToProps = createStructuredSelector<any, IStateProps>({
  currentDieRoll: currentDieRollSelector,
  isDieRollAllowed: isDieRollAllowedSelector,
});

const mapDispatchToProps = {
  rollDie,
}

class DiceBare extends React.PureComponent<IProps> {
  state = { currentRoll: Rolls.SIX }

  render() {
    const dieClassNames = this.props.isDieRollAllowed ? styles.Die : [styles.Die, styles.Disabled];
    return (
      <div className={styles.Container}>
        <div className={classnames(dieClassNames)} style={getStyleObject(DICE_SIZE, DICE_SIZE)} onClick={() => this.props.rollDie()}>
          {
            this.renderDots()
          }
        </div>
      </div>
    );
  }

  private renderDots = () => {
    const elements: any[] = [];
    const configurationForCurrentRoll = CONFIGURATIONS[this.props.currentDieRoll];

    for (let i = 0; i < configurationForCurrentRoll.length; i++) {
      const isVisible = Boolean(configurationForCurrentRoll[i]);
      const classNames = isVisible ? styles.Dot : [styles.Dot, styles.Invisible];
      elements.push(
        <div className={classnames(classNames)} key={i}/>,
      )
    }

    return elements;
  }
}

export const Dice = connect(mapStateToProps, mapDispatchToProps)(DiceBare) as unknown as React.ComponentClass<{}>;
