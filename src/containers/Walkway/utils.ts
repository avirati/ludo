import { WalkwayPosition } from 'state/interfaces';

export const generateCellID = (walkwayPosition: WalkwayPosition, row: number, column: number) => `${walkwayPosition}_${row}_${column}`;
