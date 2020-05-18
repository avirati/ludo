import { BaseColors, WalkwayPosition } from 'state/interfaces';

export interface ICoin<T> {
  readonly color: T;
}

export interface IBase<T> {
  coins: ICoin<T>[];
  color: T;
  ID: string;
}

export interface IWalkway {
  position: WalkwayPosition;
  ID: string;
}

export enum BoardEntities {
  BASE = 'BASE',
  WALKWAY = 'WALKWAY',
  HOME = 'HOME',
}

export interface IRelationship {
  ID: string;
  type: BoardEntities,
}

export interface IState {
  bases: Map<IBase<BaseColors>['ID'], IBase<BaseColors>>;
  walkways: Map<IWalkway['ID'], IWalkway>;
  relationships: IRelationship[];
}

export interface IServerGameData {
  bases: IBase<BaseColors>[];
  walkways: IWalkway[];
  relationships: IRelationship[];
}
