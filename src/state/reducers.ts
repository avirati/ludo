import { NAME as ludoReducerName } from 'containers/Ludo/state/constants';
import { reducer as ludoReducer } from 'containers/Ludo/state/reducer';

export const reducers = {
  [ludoReducerName]: ludoReducer,
}
