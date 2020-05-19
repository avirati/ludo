import { IReduxAction } from 'state/interfaces';

import { IMenuContent } from './interfaces';

export enum ActionTypes {
  SHOW_CONTEXT_MENU = 'contextMenu/SHOW_CONTEXT_MENU',
  HIDE_CONTEXT_MENU = 'contextMenu/HIDE_CONTEXT_MENU',
}

export const showContextMenu = (x: number, y: number, menuContents: IMenuContent[]): IReduxAction<ActionTypes.SHOW_CONTEXT_MENU, { menuContents: IMenuContent[], x: number, y: number }> => ({
  data: {
    menuContents,
    x,
    y,
  },
  type: ActionTypes.SHOW_CONTEXT_MENU,
});

export const hideContextMenu = (): IReduxAction<ActionTypes.HIDE_CONTEXT_MENU, void> => ({
  type: ActionTypes.HIDE_CONTEXT_MENU,
});

export type Actions =
  | ReturnType<typeof showContextMenu>
  | ReturnType<typeof hideContextMenu>
  ;
