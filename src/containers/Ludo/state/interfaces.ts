import { BaseColors, WalkwayPosition } from 'state/interfaces';

interface ICoin<T> {
  readonly color: T;
}

interface IBase<T> {
  coins: ICoin<T>[];
  color: T;
  ID: string;
}

interface IWalkway {
  position: WalkwayPosition;
  ID: string;
}

export interface IState {
  bases: IBase<BaseColors>[];
  walkways: IWalkway[];
  relationships: string[];
}
