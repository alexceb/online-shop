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

interface GetProductByIdFromApiAction {
  type: typeof ActionNames.GET_PRODUCT_BY_ID_FROM_API
  payload: {
    products: Product[],
    product: Product,
    isLoading: boolean,
  }
}

interface GetProductByIdAction {
  type: typeof ActionNames.GET_PRODUCT_BY_ID
  payload: {
    products: Product[],
    id: number,
  }
}

export type DetailsActions = GetProductByIdAction |
                             ProductResetAction |
                             GetProductByIdFromApiAction;

export const onGetProductByIdFromApi = (products: Product[], id: number) => {
  return (dispatch: Dispatch<DetailsActions>) => {
    api.getProductById(id)
      .then(res => {
        dispatch({
          type: ActionNames.GET_PRODUCT_BY_ID_FROM_API,
          payload: {
            products: products.filter(product => product.id === id),
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

export const onGetProductById = (products: Product[], id: number) => ({
  type: ActionNames.GET_PRODUCT_BY_ID_FROM_API,
  payload: {
    products,
    id,
  }
})

export const resetSelectedProduct = (): ProductResetAction  => ({
  type: ActionNames.RESET_SELECTED_PRODUCT,
  payload: { isLoading: true },
});
