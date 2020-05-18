import { BaseColors } from 'interfaces';

import { BASE_COLORS, CELL_SIZE } from './globalConstants';

export const getStyleObject = (cellCount: number, baseColor?: BaseColors): React.CSSProperties => ({
  backgroundColor: baseColor && getBaseHexColor(baseColor),
  height: `${cellCount * CELL_SIZE}px`,
  width: `${cellCount * CELL_SIZE}px`,
});

export const getBaseHexColor = (color: BaseColors) => BASE_COLORS[color];
