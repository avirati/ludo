import {
  call,
  delay,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { api } from 'common/http';
import { mapByProperty } from 'common/utils';
import { markDieRoll } from 'containers/Dice/state/actions';
import { currentDieRollSelector } from 'containers/Dice/state/selectors';

import {
  getInitialGameDataSuccess,
  liftCoin,
  moveCoin,
  moveCoinSuccess,
  placeCoin,
  spawnCoin,
  spawnCoinSuccess,
  ActionTypes,
} from './actions';
import {
  BaseID,
  CellType,
  ICoin,
  IServerGameData,
  IState,
} from './interfaces';
import {
  basesSelector,
  cellsSelector,
  coinsSelector,
  linksSelector,
  walkwaysSelector,
} from './selectors';

function * watchForGetInitialGameData() {
  yield takeLatest(ActionTypes.GET_INITIAL_GAME_DATA, getInitialGameDataSaga);
}

function * getInitialGameDataSaga() {
  const data: IServerGameData = yield call(api.get, { url: 'http://localhost:8080/initialGameData.json' });
  const coins = data.bases.reduce((result, current) => result.concat(current.coins.map((coin) => ({ ...coin, color: current.color, baseID: current.ID }))), [] as ICoin[]);
  const bases = data.bases.map((base) => ({ ...base, spawnable: false }));
  const gameData: IState = {
    bases: mapByProperty(bases, 'ID'),
    cells: data.cells,
    coins: mapByProperty(coins, 'coinID'),
    currentTurn: BaseID.BASE_3,
    links: data.links,
    relationships: data.relationships,
    walkways: mapByProperty(data.walkways, 'ID'),
  };
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
  yield put(markDieRoll(false));
}

function * watchForMoveCoin() {
  yield takeLatest(ActionTypes.MOVE_COIN, moveCoinSaga);
}

function * moveCoinSaga(action: ReturnType<typeof moveCoin>) {
  let { cellID, walkwayPosition } = { ...action.data! };
  const { coinID } = action.data!;

  const currentDieRoll: ReturnType<typeof currentDieRollSelector> = yield select(currentDieRollSelector);

  for (let i = 0; i < currentDieRoll; i++) {
    const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
    const cells: ReturnType<typeof cellsSelector> = yield select(cellsSelector);
    const links: ReturnType<typeof linksSelector> = yield select(linksSelector);
    const nextCells = links[cellID];
    let nextCell;

    // Possibility of entering HOMEPATH
    nextCell = nextCells.length > 1
    ? nextCells.find(
      (cell) =>
        cells[cell.position][cell.cellID].cellType === CellType.HOMEPATH
        && coins[coinID].baseID === cells[cell.position][cell.cellID].baseID,
    ) || nextCells[0]
    : nextCells[0];

    yield put(liftCoin(cellID, coinID, walkwayPosition));

    yield put(placeCoin(nextCell.cellID, coinID, nextCell.position));

    yield delay(100);

    cellID = nextCell.cellID;
    walkwayPosition = nextCell.position;
  }

  yield put(moveCoinSuccess());
  yield put(markDieRoll(false));
}

export const sagas = [
  watchForGetInitialGameData,
  watchForSpawnCoin,
  watchForMoveCoin,
];
