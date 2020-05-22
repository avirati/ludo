import {
  all,
  fork,
} from 'redux-saga/effects';

import { sagas as dieSagas } from 'containers/Dice/state/sagas';
import { sagas as ludoSagas } from 'containers/Ludo/state/sagas';

import { ISaga } from './interfaces';

const sagas: ISaga[] = [
  ...ludoSagas,
  ...dieSagas,
];

export default function * root() {
  yield all(sagas.map((saga) => fork(saga)));
}
