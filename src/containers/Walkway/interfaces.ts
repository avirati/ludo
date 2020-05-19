import { WalkwayPosition } from 'state/interfaces';

export interface IContextMenuOptions {
  cellID: string,
  column: number,
  position: WalkwayPosition,
  row: number,
  x: number,
  y: number,
}
