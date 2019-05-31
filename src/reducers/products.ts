import { ActionNames } from '../actions/constants';
import { ProductActions } from '../actions/products';
import { Product } from '../typings/model';

interface ProductsState {
  data: Product[]
  isLoading: boolean
}

const initialState: ProductsState = {
  data: [],
  isLoading: true,
};

export const productsReducer = (state = initialState, action: ProductActions): ProductsState => {
    switch (action.type) {
      case (ActionNames.RECEIVED_DATA):
        return {
          ...state,
          data: action.payload.data,
          isLoading: action.payload.isLoading,
        }
      default:
        return state;
    }
}
