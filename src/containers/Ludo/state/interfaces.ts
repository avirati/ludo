import { BaseColors, WalkwayPosition } from 'state/interfaces';

export interface ICoin {
  isRetired: boolean;
  isSpawned: boolean;
  coinID: string;
  color: BaseColors;
  baseID: IBase['ID'];
  steps: number;
  cellID: ICell['cellID'];
  position: WalkwayPosition;
}

export enum BaseID {
  BASE_1 = 'BASE_1',
  BASE_2 = 'BASE_2',
  BASE_3 = 'BASE_3',
  BASE_4 = 'BASE_4',
}

export interface IBase {
  coinIDs: ICoin['coinID'][];
  color: BaseColors;
  ID: BaseID;
  nextTurn: BaseID;
  spawnable: boolean;
  hasWon: boolean;
  enabled: boolean;
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
  links: IServerGameData['links'];
  coins: { [coinID: string]: ICoin };
  currentTurn: BaseID;
}

export interface IServerGameData {
  bases: IBase[];
  coins: ICoin[];
  walkways: IWalkway[];
  relationships: IRelationship[];
  cells: {
    [walkwayPosition: string]: {
      [cellID: string]: ICell;
    };
  };
  links: { [cellID: string]: Pick<ICell, 'position' | 'cellID'>[] };
}

export interface IPathway {
  from: {
    cellID: ICell['cellID'];
    walkwayPosition: WalkwayPosition;
  };
  to: {
    cellID: ICell['cellID'];
    walkwayPosition: WalkwayPosition;
  };
  coinID: ICoin['coinID'];
}
