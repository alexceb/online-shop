import { ActionNames } from './constants';
import { Product } from '../typings/model';
import { Dispatch } from 'redux';
import { api } from '../utils/api';

interface ProductResetAction {
  type: typeof ActionNames.RESET_SELECTED_PRODUCT
  payload: {
    isLoading: boolean,
  };
}

interface GetProductByIdFromApiAction {
  type: typeof ActionNames.GET_PRODUCT_BY_ID_SUCCESS
  payload: {
    products: Product[],
    product: Product,
    isLoading: boolean,
  }
}

interface GetProductByIdErrorAction {
  type: typeof ActionNames.GET_PRODUCT_BY_ID_ERROR
  payload: {
    error: Error,
    isLoading: boolean,
  }
}

export type DetailsActions = ProductResetAction |
                             GetProductByIdFromApiAction |
                             GetProductByIdErrorAction;

export const onGetProductByIdFromApi = (products: Product[], id: number) => {
  return (dispatch: Dispatch<DetailsActions>) => {
    return api.getProductById(id)
      .then(res => dispatch(onGetProductSuccess(products, res, id)))
      .catch(err => dispatch(onGetProductError(err)));
  }
}

export const onGetProductSuccess = (products: Product[], res: Product, id: number): GetProductByIdFromApiAction => ({
  type: ActionNames.GET_PRODUCT_BY_ID_SUCCESS,
  payload: {
    products: products.filter(product => product.id === id),
    product: res,
    isLoading: false,
  },
});

export const onGetProductError = (error: Error): GetProductByIdErrorAction => ({
  type: ActionNames.GET_PRODUCT_BY_ID_ERROR,
  payload: {
    error,
    isLoading: false,
  }
})

export const resetSelectedProduct = (): ProductResetAction  => ({
  type: ActionNames.RESET_SELECTED_PRODUCT,
  payload: { isLoading: true },
});
