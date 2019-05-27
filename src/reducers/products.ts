import { ActionNames } from '../actions/constants';
import { ProductActions } from '../actions/products';
import { Product } from '../typings/model';

type ProductsState = Product[];

const initialState: ProductsState = [];

export const productsReducer = (state = initialState, action: ProductActions): ProductsState => {
    switch (action.type) {
      case (ActionNames.RECEIVED_DATA):
        return action.payload;
      default:
        return state;
    }
}
