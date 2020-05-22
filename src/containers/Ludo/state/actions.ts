import { IReduxAction, WalkwayPosition } from 'state/interfaces';

import { IBase, ICell, ICoin, IState, IWalkway } from './interfaces';

export enum ActionTypes {
  GET_INITIAL_GAME_DATA = 'ludo/GET_INITIAL_GAME_DATA',
  GET_INITIAL_GAME_DATA_SUCCESS = 'ludo/GET_INITIAL_GAME_DATA_SUCCESS',

  SPAWN_COIN = 'ludo/SPAWN_COIN',
  SPAWN_COIN_SUCCESS = 'ludo/SPAWN_COIN_SUCCESS',
  MOVE_COIN = 'ludo/MOVE_COIN',
  MOVE_COIN_SUCCESS = 'ludo/MOVE_COIN_SUCCESS',
  LIFT_COIN = 'ludo/LIFT_COIN',
  PLACE_COIN = 'ludo/PLACE_COIN',
  DISQUALIFY_COIN = 'ludo/DISQUALIFY_COIN',
  HOME_COIN = 'ludo/HOME_COIN',

  NEXT_TURN = 'ludo/NEXT_TURN',

  MARK_CURRENT_BASE = 'ludo/MARK_CURRENT_BASE',
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

export const markCurrentBase = (spawnable: boolean): IReduxAction<ActionTypes.MARK_CURRENT_BASE, { spawnable: boolean }> => ({
  data: { spawnable },
  type: ActionTypes.MARK_CURRENT_BASE,
});

export const moveCoinSuccess = (bonusChance: boolean): IReduxAction<ActionTypes.MOVE_COIN_SUCCESS, { bonusChance: boolean }> => ({
  data: { bonusChance },
  type: ActionTypes.MOVE_COIN_SUCCESS,
});

export const disqualifyCoin = (coinID: ICoin['coinID'], baseID: IBase['ID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID']): IReduxAction<ActionTypes.DISQUALIFY_COIN, { coinID: ICoin['coinID'], baseID: IBase['ID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID'] }> => ({
  data: { coinID, baseID, walkwayPosition, cellID },
  type: ActionTypes.DISQUALIFY_COIN,
});

export const homeCoin = (cellID: ICell['cellID'], coinID: ICoin['coinID'], walkwayPosition: WalkwayPosition): IReduxAction<ActionTypes.HOME_COIN, { coinID: ICoin['coinID']; walkwayPosition: WalkwayPosition; cellID: ICell['cellID']; }> => ({
  data: { cellID, coinID, walkwayPosition },
  type: ActionTypes.HOME_COIN,
});

export type Actions =
  | ReturnType<typeof getInitialGameDataSuccess>
  | ReturnType<typeof spawnCoin>
  | ReturnType<typeof spawnCoinSuccess>
  | ReturnType<typeof moveCoin>
  | ReturnType<typeof liftCoin>
  | ReturnType<typeof placeCoin>
  | ReturnType<typeof nextTurn>
  | ReturnType<typeof markCurrentBase>
  | ReturnType<typeof moveCoinSuccess>
  | ReturnType<typeof disqualifyCoin>
  | ReturnType<typeof homeCoin>
  ;
