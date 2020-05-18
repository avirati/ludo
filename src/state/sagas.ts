import {
  all,
  fork,
} from 'redux-saga/effects';

import { ISaga } from './interfaces';

const sagas: ISaga[] = [];

export default function * root() {
  yield all(sagas.map((saga) => fork(saga)));
}
