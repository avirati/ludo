import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { api } from 'common/http';
import { mapByProperty } from 'common/utils';

import { getInitialGameDataSuccess, spawnCoin, ActionTypes } from './actions';
import { IServerGameData, IState } from './interfaces';
import { basesSelector } from './selectors';

function * watchForGetInitialGameData() {
  yield takeLatest(ActionTypes.GET_INITIAL_GAME_DATA, getInitialGameDataSaga);
}

function * getInitialGameDataSaga() {
  const data: IServerGameData = yield call(api.get, { url: 'http://localhost:8080/initialGameData.json' });
  const links: IState['links'] = {};
  for (const key in data.links) {
    if (data.links[key]) {
      links[key] = data.links[key];
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

function * watchForSpawnCoin() {
  yield takeLatest(ActionTypes.SPAWN_COIN, spawnCoinSaga);
}

function * spawnCoinSaga(action: ReturnType<typeof spawnCoin>) {
  const { baseID, coinID } = action.data!;
  const bases: ReturnType<typeof basesSelector> = yield select(basesSelector);
  const base = bases[baseID];
  const coin = base.coins.find((coin) => coin.coinID === coinID)!;
  console.log(base, coin);
}

export const sagas = [
  watchForGetInitialGameData,
  watchForSpawnCoin,
];
