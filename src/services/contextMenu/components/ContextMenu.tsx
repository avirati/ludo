import React from 'react';

import { IState } from '../interfaces';

import styles from './ContextMenu.module.css';

interface IProps {
  menuContents: IState['menuContents'];
  position: IState['position'];
}

export class ContextMenu extends React.PureComponent<IProps> {
  render() {
    const { menuContents, position } = this.props;
    return (
      <div
        className={styles.Container}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {
          menuContents.map((menuContent, index) => (
            <div className={styles.MenuItem} onClick={() => menuContent.action()} key={index}>
              { menuContent.label }
            </div>
          ))
        }
      </div>
    );
  }
}
