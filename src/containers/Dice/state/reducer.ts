import { Actions, ActionTypes } from './actions';
import { IState, Rolls } from './interfaces';

const initialState: IState = {
  isDieRollAllowed: true,
  roll: Rolls.SIX,
};

export const reducer = (state: IState = initialState, action: Actions): IState => {
  switch (action.type) {
    case ActionTypes.ROLL_DIE_COMPLETE:
      return {
        ...state,
        isDieRollAllowed: true,
        roll: action.data!.value,
      }
    default:
      return state;
  }
}
