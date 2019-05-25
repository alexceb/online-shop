import { action, Action } from 'typesafe-actions';
import { Dispatch } from 'redux';

import { ActionNames } from './constants';
import { Product } from '../typings/model';
import { api } from '../utils/api';

export interface ReceivedDataAction extends Action {
  payload: Product[];
}

export const onGetData = () => {
  return async (dispatch: Dispatch<ReceivedDataAction>) => {
    const result = await api.getProducts();

    return dispatch({
      type: ActionNames.RECEIVED_DATA,
      payload: result,
    })
  }
}
export const onDataReceived = (data: Product[]) => action(ActionNames.RECEIVED_DATA, data);
