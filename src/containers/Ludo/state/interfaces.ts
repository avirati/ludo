import { BaseColors } from 'state/interfaces';

interface ICoin<T> {
  readonly color: T;
}

interface IBase<T> {
  coins: ICoin<T>[];
  color: T;
}

export interface IState {
  bases: IBase<BaseColors>[];
}
