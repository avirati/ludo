import { createSelector } from 'reselect';

import { IApplicationState } from 'state/interfaces';

import { IState } from './interfaces';

export const ludoStateSelector = (state: IApplicationState): IState => state.ludo;

export const basesSelector = createSelector(
  [ludoStateSelector],
  (state) => state.bases,
);
