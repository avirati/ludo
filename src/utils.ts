import { BaseColors } from 'interfaces';

import { BASE_COLORS, CELL_SIZE } from './globalConstants';

export const getStyleObject = (
  cellCountLengthwise: number,
  cellCountWidthwise: number,
  baseColor?: BaseColors,
): React.CSSProperties => ({
  backgroundColor: baseColor && getBaseHexColor(baseColor),
  height: `${cellCountWidthwise * CELL_SIZE}px`,
  width: `${cellCountLengthwise * CELL_SIZE}px`,
});

export const getBaseHexColor = (color: BaseColors) => BASE_COLORS[color];
