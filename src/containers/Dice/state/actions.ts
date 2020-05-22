import { IReduxAction } from 'state/interfaces';

import { Rolls } from './interfaces';

export enum ActionTypes {
  ROLL_DIE = 'die/ROLL_DIE',
  ROLL_DIE_COMPLETE = 'die/ROLL_DIE_COMPLETE',
}

export const rollDie = (): IReduxAction<ActionTypes.ROLL_DIE, void> => ({
  type: ActionTypes.ROLL_DIE,
});

export const rollDieComplete = (value: Rolls): IReduxAction<ActionTypes.ROLL_DIE_COMPLETE, { value: Rolls }> => ({
  data: { value },
  type: ActionTypes.ROLL_DIE_COMPLETE,
});

export type Actions =
  | ReturnType<typeof rollDie>
  | ReturnType<typeof rollDieComplete>
  ;
