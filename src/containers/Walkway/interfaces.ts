export enum CellType {
  SPAWN = 'SPAWN',
  STAR = 'STAR',
  HOMEPATH = 'HOMEPATH',
  NORMAL = 'NORMAL',
}

export interface ICellMapping {
  cellID: string;
  nextCellIDs: string[];
  cellType: CellType;
}
