import {
  call,
  delay,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import { api } from 'common/http';
import { mapByProperty } from 'common/utils';
import { markDieRoll, enableDie } from 'containers/Dice/state/actions';
import { currentDieRollSelector } from 'containers/Dice/state/selectors';
import { WalkwayPosition } from 'state/interfaces';

import {
  disqualifyCoin,
  getInitialGameDataSuccess,
  homeCoin,
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
  ICell,
  ICoin,
  IPathway,
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

function * checkMove(action: ReturnType<typeof moveCoin>) {
  let { cellID, walkwayPosition } = { ...action.data! };
  const { coinID } = action.data!;
  const currentDieRoll: ReturnType<typeof currentDieRollSelector> = yield select(currentDieRollSelector);

  const pathways: IPathway[] = [];

  for (let i = 0; i < currentDieRoll; i++) {
    const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
    const cells: ReturnType<typeof cellsSelector> = yield select(cellsSelector);
    const links: ReturnType<typeof linksSelector> = yield select(linksSelector);
    const nextCells = links[cellID];
    let nextCell;

    if (nextCells[0].cellID === 'HOME' && i !== currentDieRoll - 1) {
      // Move not possible
      return [];
    }

    // Possibility of entering HOMEPATH
    nextCell = nextCells.length > 1
    ? nextCells.find(
      (cell) =>
        cells[cell.position][cell.cellID].cellType === CellType.HOMEPATH
        && coins[coinID].baseID === cells[cell.position][cell.cellID].baseID,
    ) || nextCells[0]
    : nextCells[0];

    pathways.push({
      coinID,
      from: {
        cellID,
        walkwayPosition,
      },
      to: {
        cellID: nextCell.cellID,
        walkwayPosition: nextCell.position,
      },
    });

    cellID = nextCell.cellID;
    walkwayPosition = nextCell.position;
  }

  return pathways;
}

function * moveCoinSaga(action: ReturnType<typeof moveCoin>) {
  let { cellID, walkwayPosition } = { ...action.data! };

  const pathways: IPathway[] = yield call(checkMove, action);

  let bonusChance = false;

  for (const pathway of pathways) {
    yield put(liftCoin(pathway.from.cellID, pathway.coinID, pathway.from.walkwayPosition));

    if (pathway.to.cellID === 'HOME') {
      yield put(homeCoin(pathway.from.cellID, pathway.coinID, pathway.from.walkwayPosition));
      bonusChance = true;
    }
    else {
      yield put(placeCoin(pathway.to.cellID, pathway.coinID, pathway.to.walkwayPosition));
    }

    yield delay(100);
    cellID = pathway.to.cellID;
    walkwayPosition = pathway.to.walkwayPosition;
  }

  if (pathways.length > 0) {
    const didDisqualificationHappened = yield call(performDisqualificationCheck, action.data!.coinID, walkwayPosition, cellID);
    if (didDisqualificationHappened) {
      bonusChance = true;
    }
  } else {
    yield put(moveCoinSuccess(false));
  }
  if (bonusChance) {
    yield put(enableDie());
  }
  yield put(moveCoinSuccess(bonusChance));
  yield put(markDieRoll(false));
}

function * performDisqualificationCheck(activeCoinID: ICoin['coinID'], walkwayPosition: WalkwayPosition, cellID: ICell['cellID']) {
  const cells: ReturnType<typeof cellsSelector> = yield select(cellsSelector);
  const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);

  const activeCoin = coins[activeCoinID];
  const cellInWhichCoinLanded = cells[walkwayPosition][cellID];
  if (cellInWhichCoinLanded.cellType === CellType.NORMAL) {
    // Check if the coin disqualifies another of a different base
    for (const coinID of cellInWhichCoinLanded.coinIDs) {
      const coin = coins[coinID];
      if (activeCoin.baseID !== coin.baseID) {
        yield put(disqualifyCoin(coinID, coin.baseID, walkwayPosition, cellID));
        return true;
      }
    }
  }

  return false;
}

export const sagas = [
  watchForGetInitialGameData,
  watchForSpawnCoin,
  watchForMoveCoin,
];
