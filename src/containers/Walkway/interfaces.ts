import { CellType } from 'containers/Ludo/state/interfaces';
import { WalkwayPosition } from 'state/interfaces';

export interface IContextMenuOptions {
  cellID: string,
  cellType: CellType;
  column: number,
  position: WalkwayPosition,
  row: number,
  x: number,
  y: number,
}
