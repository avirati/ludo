import { createSelector } from 'reselect';

import { IApplicationState } from 'state/interfaces';

import { IState } from './interfaces';

export const contextMenuStateSelector = (state: IApplicationState): IState => state.contextMenu;

export const isContextMenuVisibleSelector = createSelector(
  [contextMenuStateSelector],
  (state) => state.visible,
);

export const contextMenuPositionSelector = createSelector(
  [contextMenuStateSelector],
  (state) => state.position,
);

export const menuContentsSelector = createSelector(
  [contextMenuStateSelector],
  (state) => state.menuContents,
);
