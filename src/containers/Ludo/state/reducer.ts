import { Actions, ActionTypes } from './actions';
import { IState } from './interfaces';

const initialState: IState = {
  bases: new Map(),
  cells: {},
  relationships: [],
  walkways: new Map(),
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS:
      const { bases, cells, relationships, walkways } = action.data!.gameData;
      return {
        ...state,
        bases,
        cells,
        relationships,
        walkways,
      }
    default:
      return state;
  }
}
