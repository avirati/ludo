import { Actions, ActionTypes } from './actions';
import { IState } from './interfaces';

const initialState: IState = {
  bases: new Map(),
  relationships: [],
  walkways: new Map(),
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.GET_INITIAL_GAME_DATA_SUCCESS:
      return {
        ...state,
        bases: action.data!.gameData.bases,
        relationships: action.data!.gameData.relationships,
        walkways: action.data!.gameData.walkways,
      }
    default:
      return state;
  }
}
