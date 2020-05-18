import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { api } from 'common/http';

import { getInitialGameDataSuccess, ActionTypes } from './actions';
import { IState } from './interfaces';

function * watchForGetInitialGameData() {
  yield takeLatest(ActionTypes.GET_INITIAL_GAME_DATA, getInitialGameDataSaga);
}

function * getInitialGameDataSaga() {
  const data: IState = yield call(api.get, { url: 'http://localhost:8080/initialGameData.json' });
  yield put(getInitialGameDataSuccess(data));
}

export const sagas = [
  watchForGetInitialGameData,
];
