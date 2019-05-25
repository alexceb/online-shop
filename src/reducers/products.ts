import { ActionNames } from '../actions/constants';
import { initialState } from '.';
import { ReceivedDataAction } from '../actions/products';
import { Reducer } from 'redux';
import { Product } from '../typings/model';

export type ProductActions = ReceivedDataAction;

export const productsReducer: Reducer<Product[], ProductActions> = 
  (state = initialState.products, action: ProductActions) => {
    switch (action.type) {
      case (ActionNames.RECEIVED_DATA):
        return action.payload;
      default:
        return state;
    }
}
