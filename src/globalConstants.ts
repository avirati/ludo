import { BaseColors } from 'state/interfaces';

export const CELL_DIMENSION = 40;                             // Pixels
export const CELL_SIZE = 1;                                   // Pixels
export const BOARD_SIZE = 15;                                 // Cells
export const BOARD_DIMENSION = CELL_DIMENSION * BOARD_SIZE;   // Pixels
export const BASE_SIZE = 6;                                   // Cells
export const INNER_BASE_SIZE = 4;                             // Cells
export const COIN_PLACEHOLDER_SIZE = 2;                       // Cells
export const COIN_SIZE = 1;                                   // Cells
export const WALKWAY_LENGTH = 6;                              // Cells
export const WALKWAY_WIDTH = 3;                               // Cells
export const HOME_SIZE = 3;                                   // Cells
export const BASE_COLORS: { [key: string]: string } = {
  [BaseColors.RED]: '#D22E2E',
  [BaseColors.GREEN]: '#088812',
  [BaseColors.BLUE]: '#17669F',
  [BaseColors.YELLOW]: '#E3DE3B',
}
