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

interface ReceivedDataWithErrorAction {
  type: typeof ActionNames.RECEIVED_DATA_ERROR
  payload: {
    error: Error
    isLoading: boolean
  }
}

interface ChangeAmountAction {
  type: typeof ActionNames.INCREASE_AMOUNT_IN_STOCK | ActionNames.DECREASE_AMOUNT_IN_STOCK
  payload: {
    item: CartItem
    amount: number
  }
}

export type ProductActions = ReceivedDataAction | ChangeAmountAction | ReceivedDataWithErrorAction;

export const onGetData = () => {
  return (dispatch: Dispatch<ProductActions>) => {
    return api.getProducts()
      .then(res => dispatch(onGetDataSuccess(res)))
      .catch(error => dispatch(onGetDataError(error)));
  }
}

export const onGetDataSuccess = (data: Product[]): ReceivedDataAction => ({
  type: ActionNames.RECEIVED_DATA,
  payload: {
    data: data,
    isLoading: false,
  },
});

export const onGetDataError = (error: Error): ReceivedDataWithErrorAction => ({
  type: ActionNames.RECEIVED_DATA_ERROR,
  payload: {
    error,
    isLoading: false,
  },
});

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
