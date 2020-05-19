import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { api } from 'common/http';
import { mapByProperty } from 'common/utils';

import { getInitialGameDataSuccess, spawnCoin, ActionTypes, spawnCoinSuccess } from './actions';
import { IServerGameData, IState, CellType } from './interfaces';
import { basesSelector, walkwaysSelector, cellsSelector } from './selectors';

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
  const walkways: ReturnType<typeof walkwaysSelector> = yield select(walkwaysSelector);
  const cells: ReturnType<typeof cellsSelector> = yield select(cellsSelector);
  const base = bases[baseID];
  const walkway = Object.values(walkways).find((walkway) => walkway.baseID === baseID)!;
  const walkwayCells = cells[walkway.position];
  const spawnCellForCoin = Object.values(walkwayCells).find((cell) => cell.cellType === CellType.SPAWN)!;
  const coin = base.coins.find((coin) => coin.coinID === coinID)!;

  yield put(spawnCoinSuccess(spawnCellForCoin.cellID, coin.coinID, baseID, walkway.position));
}

export const sagas = [
  watchForGetInitialGameData,
  watchForSpawnCoin,
];
