import { action } from 'typesafe-actions';

import { ActionNames } from './constants';
import { Product } from '../typings/model';
import { Dispatch } from 'redux';
import { getInitialData } from './services';

export const onGetData = () => {
  return async (dispatch: Dispatch) => {
    const result = await getInitialData();

    return dispatch({
      type: ActionNames.RECEIVED_DATA,
      payload: result,
    })
  }
}
export const onDataReceived = (data: Product[]) => action(ActionNames.RECEIVED_DATA, data);
