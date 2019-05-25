import { ActionType } from 'typesafe-actions';

import * as actions from '../actions/products';
import { ActionNames } from '../actions/constants';
import { initialState } from '.';

export type AppActions = ActionType<typeof actions>;

export const productsReducer = (state = initialState.products, action: AppActions) => {
  switch (action.type) {
    case (ActionNames.RECEIVED_DATA):
      return action.payload;
    default:
      return state;
  }
}
