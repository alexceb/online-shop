import { action, Action } from 'typesafe-actions';
import { ActionNames } from './constants';
import { Product } from '../typings/model';
import { Dispatch } from 'redux';
import { api } from '../utils/api';

export interface ProductSelectedAction extends Action {
  payload: Product;
}

export const onGetProductById = (id: number) => {
  return async (dispatch: Dispatch<ProductSelectedAction>) => {
    const result = await api.getProductById(id);

    return dispatch({
      type: ActionNames.GET_PRODUCT_BY_ID,
      payload: result,
    })
  }
}

export const resetSelectedProduct = () => action(ActionNames.RESET_SELECTED_PRODUCT);

// export const onSelectProduct = (product: Product) => action(ActionNames.PRODUCT_SELECTED, product);
