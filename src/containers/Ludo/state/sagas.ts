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
  const links: IState['links'] = new Map();
  for (const key in data.links) {
    if (data.links[key]) {
      links.set(key, new Set(data.links[key]));
    }
  }
  const gameData: IState = {
    bases: mapByProperty(data.bases, 'ID'),
    cells: data.cells,
    links,
    relationships: data.relationships,
    walkways: mapByProperty(data.walkways, 'ID'),
  }
  yield put(getInitialGameDataSuccess(gameData));
}

export const sagas = [
  watchForGetInitialGameData,
];
