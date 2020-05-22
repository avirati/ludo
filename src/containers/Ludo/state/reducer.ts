import { Actions, ActionTypes } from './actions';
import { BaseID, IState } from './interfaces';

const initialState: IState = {
  bases: {},
  cells: {},
  coins: {},
  currentTurn: BaseID.BASE_3,
  links: {},
  relationships: [],
  walkways: {},
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS: {
      const {
        bases,
        cells,
        coins,
        relationships,
        walkways,
        links,
      } = action.data!.gameData;
      return {
        ...state,
        bases,
        cells,
        coins,
        links,
        relationships,
        walkways,
      };
    }
    case ActionTypes.SPAWN_COIN_SUCCESS: {
      const { baseID, cellID, coinID, position } = action.data!;
      const coins = [...state.bases[baseID].coins];
      const coinIndex = coins.findIndex((coin) => coin.coinID === coinID);
      coins[coinIndex].isSpawned = true;
      return {
        ...state,
        bases: {
          ...state.bases,
          [baseID]: {
            ...state.bases[baseID],
            coins,
          },
        },
        cells: {
          ...state.cells,
          [position]: {
            ...state.cells[position],
            [cellID]: {
              ...state.cells[position][cellID],
              coinIDs: [
                ...state.cells[position][cellID].coinIDs,
                coinID,
              ],
            },
          },
        },
      };
    }
    case ActionTypes.LIFT_COIN: {
      const { cellID, coinID, walkwayPosition } = action.data!;
      const coinIDsInCell = [...state.cells[walkwayPosition][cellID].coinIDs];
      const index = coinIDsInCell.findIndex((coinIDInCell) => coinIDInCell === coinID);
      coinIDsInCell.splice(index, 1);
      return {
        ...state,
        cells: {
          ...state.cells,
          [walkwayPosition]: {
            ...state.cells[walkwayPosition],
            [cellID]: {
              ...state.cells[walkwayPosition][cellID],
              coinIDs: coinIDsInCell,
            },
          },
        },
      };
    }
    case ActionTypes.PLACE_COIN: {
      const { cellID, coinID, walkwayPosition } = action.data!;
      return {
        ...state,
        cells: {
          ...state.cells,
          [walkwayPosition]: {
            ...state.cells[walkwayPosition],
            [cellID]: {
              ...state.cells[walkwayPosition][cellID],
              coinIDs: [
                ...state.cells[walkwayPosition][cellID].coinIDs,
                coinID,
              ],
            },
          },
        },
      };
    }
    case ActionTypes.NEXT_TURN:
      const nextTurn = state.bases[state.currentTurn].nextTurn;
      return {
        ...state,
        currentTurn: nextTurn,
      };
    default:
      return state;
  }
}
