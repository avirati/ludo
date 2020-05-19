import { createSelector } from 'reselect';

import { IApplicationState } from 'state/interfaces';

import { IState } from './interfaces';

export const ludoStateSelector = (state: IApplicationState): IState => state.ludo;

export const basesSelector = createSelector(
  [ludoStateSelector],
  (state) => state.bases,
);

export const relationshipsSelector = createSelector(
  [ludoStateSelector],
  (state) => state.relationships,
);

export const walkwaysSelector = createSelector(
  [ludoStateSelector],
  (state) => state.walkways,
);

export const cellsSelector = createSelector(
  [ludoStateSelector],
  (state) => state.cells,
);
