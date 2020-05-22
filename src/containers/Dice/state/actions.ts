import { IReduxAction } from 'state/interfaces';

import { Rolls } from './interfaces';

export enum ActionTypes {
  ROLL_DIE = 'die/ROLL_DIE',
  ROLL_DIE_COMPLETE = 'die/ROLL_DIE_COMPLETE',
  ENABLE_DIE = 'die/ENABLE_DIE',
  DISABLE_DIE = 'die/DISABLE_DIE',
  INVALIDATE_DIE_ROLL = 'die/INVALIDATE_DIE_ROLL',
}

export const rollDie = (): IReduxAction<ActionTypes.ROLL_DIE, void> => ({
  type: ActionTypes.ROLL_DIE,
});

export const rollDieComplete = (value: Rolls): IReduxAction<ActionTypes.ROLL_DIE_COMPLETE, { value: Rolls }> => ({
  data: { value },
  type: ActionTypes.ROLL_DIE_COMPLETE,
});

export const enableDie = (): IReduxAction<ActionTypes.ENABLE_DIE, void> => ({
  type: ActionTypes.ENABLE_DIE,
});

export const disableDie = (): IReduxAction<ActionTypes.DISABLE_DIE, void> => ({
  type: ActionTypes.DISABLE_DIE,
});

export const invalidateDieRoll = (): IReduxAction<ActionTypes.INVALIDATE_DIE_ROLL, void> => ({
  type: ActionTypes.INVALIDATE_DIE_ROLL,
});

export type Actions =
  | ReturnType<typeof rollDie>
  | ReturnType<typeof rollDieComplete>
  | ReturnType<typeof enableDie>
  | ReturnType<typeof disableDie>
  | ReturnType<typeof invalidateDieRoll>
  ;
