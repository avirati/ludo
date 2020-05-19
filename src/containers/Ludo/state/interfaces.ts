import { BaseColors, WalkwayPosition } from 'state/interfaces';

export interface ICoin {
  isRetired: boolean;
  isSpawned: boolean;
  coinID: string;
}

export interface IBase {
  coins: ICoin[];
  color: BaseColors;
  ID: string;
}

export interface IWalkway {
  position: WalkwayPosition;
  ID: string;
  baseID: IBase['ID'];
}

export enum BoardEntities {
  BASE = 'BASE',
  WALKWAY = 'WALKWAY',
  HOME = 'HOME',
}

export enum CellType {
  SPAWN = 'SPAWN',
  STAR = 'STAR',
  HOMEPATH = 'HOMEPATH',
  NORMAL = 'NORMAL',
}

export interface ICell {
  cellID: string;
  column: number;
  position: WalkwayPosition;
  row: number;
  cellType: CellType;
  baseID: IBase['ID'];
  coinIDs: ICoin['coinID'][];
}

export interface IRelationship {
  ID: string;
  type: BoardEntities;
  baseIDs?: IBase['ID'][];
}

export interface IState {
  bases: { [baseID: string]: IBase };
  walkways: { [walkwayID: string]: IWalkway };
  relationships: IServerGameData['relationships'];
  cells: IServerGameData['cells'];
  links: { [cellID: string]: ICell['cellID'][] };
}

export interface IServerGameData {
  bases: IBase[];
  walkways: IWalkway[];
  relationships: IRelationship[];
  cells: {
    [walkwayPosition: string]: {
      [cellID: string]: ICell;
    };
  },
  links: {
    [cellID: string]: ICell['cellID'][];
  }
}
