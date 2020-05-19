import { Actions, ActionTypes } from './actions';
import { IState } from './interfaces';

const initialState: IState = {
  menuContents: [],
  position: {
    x: 0,
    y: 0,
  },
  visible: false,
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.SHOW_CONTEXT_MENU:
      return {
        ...state,
        menuContents: action.data!.menuContents,
        position: {
          x: action.data!.x,
          y: action.data!.y,
        },
        visible: true,
      }
    case ActionTypes.HIDE_CONTEXT_MENU:
      return initialState;
    default:
      return state;
  }
}
