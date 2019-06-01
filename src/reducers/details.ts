import { ActionNames } from '../actions/constants';
import { DetailsActions } from '../actions/details';

interface DetailsState {
  selectedProduct: any,
  isLoading: boolean;
}

const initialState: DetailsState = {
  selectedProduct: null,
  isLoading: true,
}

export const detailsReducer = (state = initialState, action: DetailsActions): DetailsState => {
  switch (action.type) {
    case (ActionNames.GET_PRODUCT_BY_ID_FROM_API):
      return {
        selectedProduct: action.payload.products.length ?
          action.payload.products[0] : action.payload.product,
        isLoading: action.payload.isLoading,
      };
    case (ActionNames.GET_PRODUCT_BY_ID):
      return {
        ...state,
        selectedProduct: action.payload.products.filter(product => product.id === action.payload.id)
      }
    case (ActionNames.RESET_SELECTED_PRODUCT):
      return {
        selectedProduct: null,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
}