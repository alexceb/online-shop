import { action, Action } from 'typesafe-actions';
import { ActionNames } from './constants';
import { Product } from '../typings/model';
import { Dispatch } from 'redux';
import { api } from '../utils/api';
import { enableLoader } from './loader';

interface ProductResetAction {
  type: typeof ActionNames.RESET_SELECTED_PRODUCT
  payload: {
    isLoading: boolean,
  };
}

interface GetProductByIdAction {
  type: typeof ActionNames.GET_PRODUCT_BY_ID
  payload: {
    product: Product,
    isLoading: boolean,
  }
}

export type DetailsActions = GetProductByIdAction | ProductResetAction;

export const onGetProductById = (id: number) => {
  return (dispatch: Dispatch<DetailsActions>) => {
    api.getProductById(id)
      .then(res => {
        dispatch({
          type: ActionNames.GET_PRODUCT_BY_ID,
          payload: {
            product: res,
            isLoading: false,
          },
        });
        return res;
      })
      .catch(error => {

      });
  }
}

export const resetSelectedProduct = (): ProductResetAction  => ({
  type: ActionNames.RESET_SELECTED_PRODUCT,
  payload: { isLoading: true },
});
