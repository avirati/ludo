import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { api } from 'common/http';
import { mapByProperty } from 'common/utils';

import {
  getInitialGameDataSuccess,
  liftCoin,
  moveCoin,
  placeCoin,
  spawnCoin,
  spawnCoinSuccess,
  ActionTypes,
} from './actions';
import {
  CellType,
  ICoin,
  IServerGameData,
  IState,
} from './interfaces';
import {
  basesSelector,
  cellsSelector,
  linksSelector,
  walkwaysSelector,
} from './selectors';

function * watchForGetInitialGameData() {
  yield takeLatest(ActionTypes.GET_INITIAL_GAME_DATA, getInitialGameDataSaga);
}

function * getInitialGameDataSaga() {
  const data: IServerGameData = yield call(api.get, { url: 'http://localhost:8080/initialGameData.json' });
  const coins = data.bases.reduce((result, current) => result.concat(current.coins.map((coin) => ({ ...coin, color: current.color }))), [] as ICoin[]);
  const gameData: IState = {
    bases: mapByProperty(data.bases, 'ID'),
    cells: data.cells,
    coins: mapByProperty(coins, 'coinID'),
    links: data.links,
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

function * watchForMoveCoin() {
  yield takeLatest(ActionTypes.MOVE_COIN, moveCoinSaga);
}

function * moveCoinSaga(action: ReturnType<typeof moveCoin>) {
  const { cellID, coinID, walkwayPosition } = action.data!;

  const links: ReturnType<typeof linksSelector> = yield select(linksSelector);
  const nextCells = links[cellID];
  const nextCell = nextCells[0];  // TODO: Determine next cell

  yield put(liftCoin(cellID, coinID, walkwayPosition));

  yield put(placeCoin(nextCell.cellID, coinID, nextCell.position));
}

export const sagas = [
  watchForGetInitialGameData,
  watchForSpawnCoin,
  watchForMoveCoin,
];
