import { integer, MersenneTwister19937 } from 'random-js';
import { put, takeLatest } from 'redux-saga/effects';

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

export const sagas = [
  watchForRollDie,
];
