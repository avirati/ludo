import { Actions, ActionTypes } from './actions';
import { IState } from './interfaces';

const initialState: IState = {
  bases: {},
  cells: {},
  links: {},
  relationships: [],
  walkways: {},
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS:
      const { bases, cells, relationships, walkways, links } = action.data!.gameData;
      return {
        ...state,
        bases,
        cells,
        links,
        relationships,
        walkways,
      }
    case ActionTypes.SPAWN_COIN_SUCCESS:
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
      }
    default:
      return state;
  }
}
