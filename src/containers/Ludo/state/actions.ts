import { IReduxAction, WalkwayPosition } from 'state/interfaces';

import { IState, IBase, ICoin, ICell, IWalkway } from './interfaces';

export enum ActionTypes {
  GET_INITIAL_GAME_DATA = 'ludo/GET_INITIAL_GAME_DATA',
  GET_INITIAL_GAME_DATA_SUCCESS = 'ludo/GET_INITIAL_GAME_DATA_SUCCESS',

  SPAWN_COIN = 'ludo/SPAWN_COIN',
  SPAWN_COIN_SUCCESS = 'ludo/SPAWN_COIN_SUCCESS',
  MOVE_COIN = 'ludo/MOVE_COIN',
  LIFT_COIN = 'ludo/LIFT_COIN',
  PLACE_COIN = 'ludo/PLACE_COIN',

  NEXT_TURN = 'ludo/NEXT_TURN',
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
});

export const spawnCoinSuccess = (
  cellID: ICell['cellID'],
  coinID: ICoin['coinID'],
  baseID: IBase['ID'],
  position: IWalkway['position'],
): IReduxAction<ActionTypes.SPAWN_COIN_SUCCESS, { cellID: ICell['cellID'], coinID: ICoin['coinID'], baseID: IBase['ID'], position: IWalkway['position'] }> => ({
  data: { cellID, coinID, baseID, position },
  type: ActionTypes.SPAWN_COIN_SUCCESS,
});

export const moveCoin = (coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID']): IReduxAction<ActionTypes.MOVE_COIN, { coinID: ICoin['coinID']; walkwayPosition: WalkwayPosition; cellID: ICell['cellID']; }> => ({
  data: { cellID, coinID, walkwayPosition },
  type: ActionTypes.MOVE_COIN,
});

export const placeCoin = (cellID: ICell['cellID'], coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition): IReduxAction<ActionTypes.PLACE_COIN, { coinID: ICoin['coinID']; walkwayPosition: WalkwayPosition; cellID: ICell['cellID']; }> => ({
  data: { cellID, coinID, walkwayPosition },
  type: ActionTypes.PLACE_COIN,
});

export const liftCoin = (cellID: ICell['cellID'], coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition): IReduxAction<ActionTypes.LIFT_COIN, { coinID: ICoin['coinID']; walkwayPosition: WalkwayPosition; cellID: ICell['cellID']; }> => ({
  data: { cellID, coinID, walkwayPosition },
  type: ActionTypes.LIFT_COIN,
});

export const nextTurn = (): IReduxAction<ActionTypes.NEXT_TURN, void> => ({
  type: ActionTypes.NEXT_TURN,
});

export type Actions =
  | ReturnType<typeof getInitialGameDataSuccess>
  | ReturnType<typeof spawnCoin>
  | ReturnType<typeof spawnCoinSuccess>
  | ReturnType<typeof moveCoin>
  | ReturnType<typeof liftCoin>
  | ReturnType<typeof placeCoin>
  | ReturnType<typeof nextTurn>
  ;
