import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { api } from 'common/http';
import { mapByProperty } from 'common/utils';

import { getInitialGameDataSuccess, ActionTypes } from './actions';
import { IServerGameData, IState } from './interfaces';

function * watchForGetInitialGameData() {
  yield takeLatest(ActionTypes.GET_INITIAL_GAME_DATA, getInitialGameDataSaga);
}

function * getInitialGameDataSaga() {
  const data: IServerGameData = yield call(api.get, { url: 'http://localhost:8080/initialGameData.json' });
  const gameData: IState = {
    bases: mapByProperty(data.bases, 'ID'),
    cells: data.cells,
    relationships: data.relationships,
    walkways: mapByProperty(data.walkways, 'ID'),
  }
  yield put(getInitialGameDataSuccess(gameData));
}

export const sagas = [
  watchForGetInitialGameData,
];
