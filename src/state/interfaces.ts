import { ForkEffect } from 'redux-saga/effects';

import { IState as ILudoState } from 'containers/Ludo/state/interfaces';

export enum BaseColors {
  RED = 'RED',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  YELLOW = 'YELLOW',
}

export enum WalkwayPosition {
  NORTH = 'NORTH',
  EAST = 'EAST',
  WEST = 'WEST',
  SOUTH = 'SOUTH',
}

export interface IApplicationState {
  ludo: ILudoState;
}

export interface IReduxAction<T = any, D = any> {
  type: T;
  data?: D;
}

export interface ISaga {
  (): IterableIterator<ForkEffect>;
}
