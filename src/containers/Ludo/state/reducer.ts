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
    default:
      return state;
  }
}
