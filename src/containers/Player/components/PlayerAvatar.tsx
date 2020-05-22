import React from 'react';

import { getBaseHexColor } from 'containers/utils';
import { BaseColors } from 'state/interfaces';

import styles from './PlayerAvatar.module.css';

interface IProps {
  baseColor: BaseColors;
}

export class PlayerAvatar extends React.PureComponent<IProps> {
  render() {
    const { baseColor } = this.props;
    const color = getBaseHexColor(baseColor)
    return (
      <div className={styles.Container}>
        <svg width='100' height='100' xmlns='http://www.w3.org/2000/svg'>
        <g>
          <title>Layer 1</title>
          <ellipse ry='50' rx='50' id='svg_1' cy='50' cx='50' stroke-width='0' stroke={color} fill={color}/>
          <ellipse id='svg_2' cy='56.25' cx='59.25' stroke-width='0' stroke={color} fill={color}/>
          <ellipse ry='25' rx='25' id='svg_4' cy='37.796875' cx='51.75' stroke-width='0' stroke='#FFFFFF' fill='#FFFFFF'/>
          <ellipse ry='12.5' rx='27.5' id='svg_10' cy='80' cx='52' fill-opacity='null' stroke-opacity='null' stroke-width='0' stroke='#FFFFFF' fill='#FFFFFF'/>
        </g>
        </svg>
      </div>
    );
  }
}
