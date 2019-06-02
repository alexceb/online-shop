import { ActionNames } from '../actions/constants';
import { DetailsActions } from '../actions/details';
import { Product } from '../typings/model';

export interface DetailsState {
  selectedProduct: Product
  isLoading: boolean
  error: Error
}

const initialState: DetailsState = {
  selectedProduct: null,
  isLoading: true,
  error: null,
}

export const detailsReducer = (state = initialState, action: DetailsActions): DetailsState => {
  switch (action.type) {
    case (ActionNames.GET_PRODUCT_BY_ID_SUCCESS):
      return {
        ...state,
        selectedProduct: action.payload.products.length ?
          action.payload.products[0] : action.payload.product,
        isLoading: action.payload.isLoading,
      };
    case (ActionNames.GET_PRODUCT_BY_ID_ERROR):
        return {
          ...state,
          isLoading: action.payload.isLoading,
          error: action.payload.error,
        };
    case (ActionNames.RESET_SELECTED_PRODUCT):
      return {
        ...state,
        selectedProduct: null,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
}