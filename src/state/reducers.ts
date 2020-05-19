import { NAME as ludoReducerName } from 'containers/Ludo/state/constants';
import { reducer as ludoReducer } from 'containers/Ludo/state/reducer';
import { NAME as contextMenuReducerName } from 'services/contextMenu/constants';
import { reducer as contextMenuReducer } from 'services/contextMenu/reducer';

export const reducers = {
  [ludoReducerName]: ludoReducer,
  [contextMenuReducerName]: contextMenuReducer,
}
