import { BaseColors } from 'interfaces';

import { BASE_COLORS, CELL_DIMENSION } from './globalConstants';

export const getStyleObject = (
  cellCountLengthwise: number,
  cellCountWidthwise: number,
  baseColor?: BaseColors,
): React.CSSProperties => ({
  backgroundColor: baseColor && getBaseHexColor(baseColor),
  height: `${cellCountWidthwise * CELL_DIMENSION}px`,
  width: `${cellCountLengthwise * CELL_DIMENSION}px`,
});

export const getBaseHexColor = (color: BaseColors) => BASE_COLORS[color];
