export enum Rolls {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
  SIX = 6,
}

export interface IState {
  roll: Rolls;
  isDieRollAllowed: boolean;
  isDieRollValid: boolean;
}
