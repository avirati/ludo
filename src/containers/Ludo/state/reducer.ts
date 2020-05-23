import { Actions, ActionTypes } from './actions';
import { BaseID, IState } from './interfaces';
import { WINNING_MOVES } from 'globalConstants';

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
      const { cellID, coinID, position } = action.data!;
      return {
        ...state,
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
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            cellID,
            isSpawned: true,
            position,
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
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            cellID,
            position: walkwayPosition,
          },
        },
      };
    }
    case ActionTypes.NEXT_TURN: {
      const nextTurn = state.bases[state.currentTurn].nextTurn;
      return {
        ...state,
        currentTurn: nextTurn,
      };
    }
    case ActionTypes.MARK_CURRENT_BASE: {
      return {
        ...state,
        bases: {
          ...state.bases,
          [state.currentTurn]: {
            ...state.bases[state.currentTurn],
            spawnable: action.data!.spawnable,
          },
        },
      };
    }
    case ActionTypes.DISQUALIFY_COIN: {
      const { coinID, walkwayPosition, cellID } = action.data!;

      const coinIDsInCell = [...state.cells[walkwayPosition][cellID].coinIDs];
      const coinIndexToDelete = coinIDsInCell.findIndex((coinIDInCell) => coinIDInCell === coinID);
      coinIDsInCell.splice(coinIndexToDelete, 1);
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
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            isSpawned: false,
            steps: 0,
          },
        },
      };
    }
    case ActionTypes.HOME_COIN: {
      const { coinID } = action.data!;
      return {
        ...state,
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            isRetired: true,
            steps: WINNING_MOVES,
          },
        },
      };
    }
    case ActionTypes.MOVE_COIN_SUCCESS: {
      const { currentDieRoll, coinID } = action.data!;
      return {
        ...state,
        coins: {
          ...state.coins,
          [coinID]: {
            ...state.coins[coinID],
            steps: state.coins[coinID].steps + currentDieRoll,
          },
        },
      };
    }
    default:
      return state;
  }
};
