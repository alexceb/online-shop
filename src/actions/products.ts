import { Dispatch } from 'redux';

import { ActionNames } from './constants';
import { Product, CartItem } from '../typings/model';
import { api } from '../utils/api';

interface ReceivedDataAction {
  type: typeof ActionNames.RECEIVED_DATA
  payload: {
    data: Product[]
    isLoading: boolean
  };
}

interface ChangeAmountAction {
  type: typeof ActionNames.INCREASE_AMOUNT_IN_STOCK | ActionNames.DECREASE_AMOUNT_IN_STOCK
  payload: {
    item: CartItem
    amount: number
  }
}

export type ProductActions = ReceivedDataAction | ChangeAmountAction;

export const onGetData = () => {
  return async (dispatch: Dispatch<ProductActions>) => {
    const result = await api.getProducts();

    return dispatch({
      type: ActionNames.RECEIVED_DATA,
      payload: {
        data: result,
        isLoading: false,
      },
    })
  }
}

export const increaseAmountInStock = (item: CartItem, amount: number): ChangeAmountAction => ({
  type: ActionNames.INCREASE_AMOUNT_IN_STOCK,
  payload: {
    item,
    amount,
  },
});

export const decreaseAmountInStock = (item: CartItem, amount: number): ChangeAmountAction => ({
  type: ActionNames.DECREASE_AMOUNT_IN_STOCK,
  payload: {
    item,
    amount,
  },
});
