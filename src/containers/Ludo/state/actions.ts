import { IReduxAction } from 'state/interfaces';

import { IState } from './interfaces';

export enum ActionTypes {
  GET_INITIAL_GAME_DATA = 'ludo/GET_INITIAL_GAME_DATA',
  GET_INITIAL_GAME_DATA_SUCCESS = 'ludo/GET_INITIAL_GAME_DATA_SUCCESS',
}

export const getInitialGameData = (): IReduxAction<ActionTypes.GET_INITIAL_GAME_DATA, void> => ({
  type: ActionTypes.GET_INITIAL_GAME_DATA,
});

export const getInitialGameDataSuccess = (gameData: IState): IReduxAction<ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS, { gameData: IState }> => ({
  data: { gameData },
  type: ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS,
});

export type Actions =
  ReturnType<typeof getInitialGameDataSuccess>
  ;
