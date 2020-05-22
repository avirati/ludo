import { Rolls } from './interfaces';

export const NAME = 'dice';

export const CONFIGURATIONS: { [key: number]: number[] } = {
  [Rolls.ONE]: [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0,
  ],
  [Rolls.TWO]: [
    0, 0, 1,
    0, 0, 0,
    1, 0, 0,
  ],
  [Rolls.THREE]: [
    0, 0, 1,
    0, 1, 0,
    1, 0, 0,
  ],
  [Rolls.FOUR]: [
    1, 0, 1,
    0, 0, 0,
    1, 0, 1,
  ],
  [Rolls.FIVE]: [
    1, 0, 1,
    0, 1, 0,
    1, 0, 1,
  ],
  [Rolls.SIX]: [
    1, 1, 1,
    0, 0, 0,
    1, 1, 1,
  ],
};

export const allPossibleRolls = [Rolls.ONE, Rolls.TWO, Rolls.THREE, Rolls.FOUR, Rolls.FIVE, Rolls.SIX];
