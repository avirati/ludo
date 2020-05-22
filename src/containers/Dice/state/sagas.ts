import { integer, MersenneTwister19937 } from 'random-js';
import {
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';

import { markCurrentBase, moveCoinSuccess, nextTurn, ActionTypes as LudoActionTypes } from 'containers/Ludo/state/actions';
import { basesSelector, currentTurnSelector, coinsSelector } from 'containers/Ludo/state/selectors';

import { enableDie, markDieRoll, rollDieComplete, ActionTypes } from './actions';
import { Rolls } from './interfaces';

const mt = MersenneTwister19937.autoSeed();

function * watchForRollDie() {
  yield takeLatest(ActionTypes.ROLL_DIE, rollDieSaga);
}

function * rollDieSaga() {
  const dieRoll: Rolls = integer(Rolls.ONE, Rolls.SIX)(mt);
  yield put(rollDieComplete(dieRoll));
}

function * watchForRollDieComplete() {
  yield takeLatest(ActionTypes.ROLL_DIE_COMPLETE, rollDieCompleteSaga);
}

function * rollDieCompleteSaga(action: ReturnType<typeof rollDieComplete>) {
  const { value } = action.data!;
  const currentTurn: ReturnType<typeof currentTurnSelector> = yield select(currentTurnSelector);
  const bases: ReturnType<typeof basesSelector> = yield select(basesSelector);
  const coins: ReturnType<typeof coinsSelector> = yield select(coinsSelector);
  const currentTurnBase = bases[currentTurn];
  const isAnyCoinSpawned = Boolean(currentTurnBase.coinIDs.find((coinID) => coins[coinID].isSpawned));
  if (value === Rolls.SIX) {
    yield put(markCurrentBase(true));
    // Wait for spawn coin or move coin
    yield take([LudoActionTypes.SPAWN_COIN_SUCCESS, LudoActionTypes.MOVE_COIN_SUCCESS]);

    yield put(markCurrentBase(false));
  } else if (isAnyCoinSpawned) {
    const result: ReturnType<typeof moveCoinSuccess> = yield take(LudoActionTypes.MOVE_COIN_SUCCESS);
    if (!result.data!.bonusChance) {
      yield put(nextTurn());
    }
  } else {
    yield put(markDieRoll(false));
    yield put(nextTurn());
  }

  yield put(enableDie());
}

export const sagas = [
  watchForRollDie,
  watchForRollDieComplete,
];
