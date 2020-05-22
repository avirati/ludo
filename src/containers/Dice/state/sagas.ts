import { integer, MersenneTwister19937 } from 'random-js';
import { delay, put, takeLatest } from 'redux-saga/effects';

import { nextTurn } from 'containers/Ludo/state/actions';

import { rollDieComplete, ActionTypes } from './actions';
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
  console.log(value);
  yield delay(500);
  yield put(nextTurn());
}

export const sagas = [
  watchForRollDie,
  watchForRollDieComplete,
];
