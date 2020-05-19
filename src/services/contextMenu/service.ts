import { dispatch } from 'state/store';

import {
  hideContextMenu as hideContextMenuAction,
  showContextMenu as showContextMenuAction,
} from './actions';
import { IMenuContent } from './interfaces';

export const showContextMenu = (x: number, y: number, menuContents: IMenuContent[]) => dispatch(showContextMenuAction(x, y, menuContents));
export const hideContextMenu = () => dispatch(hideContextMenuAction());
