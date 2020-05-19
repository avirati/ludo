import { IReduxAction } from 'state/interfaces';

import { IState, IBase, ICoin } from './interfaces';

export enum ActionTypes {
  GET_INITIAL_GAME_DATA = 'ludo/GET_INITIAL_GAME_DATA',
  GET_INITIAL_GAME_DATA_SUCCESS = 'ludo/GET_INITIAL_GAME_DATA_SUCCESS',

  SPAWN_COIN = 'ludo/SPAWN_COIN',
}

export const getInitialGameData = (): IReduxAction<ActionTypes.GET_INITIAL_GAME_DATA, void> => ({
  type: ActionTypes.GET_INITIAL_GAME_DATA,
});

export const getInitialGameDataSuccess = (gameData: IState): IReduxAction<ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS, { gameData: IState }> => ({
  data: { gameData },
  type: ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS,
});

export const spawnCoin = (baseID: IBase['ID'], coinID: ICoin['coinID']): IReduxAction<ActionTypes.SPAWN_COIN, { baseID: IBase['ID'], coinID: ICoin['coinID'] }> => ({
  data: { baseID, coinID },
  type: ActionTypes.SPAWN_COIN,
})

export type Actions =
  | ReturnType<typeof getInitialGameDataSuccess>
  | ReturnType<typeof spawnCoin>
  ;
