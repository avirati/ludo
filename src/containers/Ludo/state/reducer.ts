import { BaseColors, IReduxAction } from 'state/interfaces';

import { IState } from './interfaces';

const initialState: IState = {
  bases: [
    {
      coins: [],
      color: BaseColors.RED,
    },
    {
      coins: [],
      color: BaseColors.GREEN,
    },
    {
      coins: [],
      color: BaseColors.YELLOW,
    },
    {
      coins: [],
      color: BaseColors.BLUE,
    },
  ],
};

export const reducer = (state: IState = initialState, action: IReduxAction): IState => {
  switch (action.type) {
    default:
      return state;
  }
}
