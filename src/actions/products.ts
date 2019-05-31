import { Dispatch } from 'redux';

import { ActionNames } from './constants';
import { Product } from '../typings/model';
import { api } from '../utils/api';

export interface ReceivedDataAction {
  type: typeof ActionNames.RECEIVED_DATA,
  payload: {
    data: Product[],
    isLoading: boolean,
  };
}

export type ProductActions = ReceivedDataAction;

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
