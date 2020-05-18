import {
  all,
  fork,
} from 'redux-saga/effects';

import { sagas as ludoSagas } from 'containers/Ludo/state/sagas';

import { ISaga } from './interfaces';

const sagas: ISaga[] = [
  ...ludoSagas,
];

export default function * root() {
  yield all(sagas.map((saga) => fork(saga)));
}
