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
    case (ActionNames.GET_PRODUCT_BY_ID):
      return {
        selectedProduct: action.payload.product,
        isLoading: action.payload.isLoading,
      };
    case (ActionNames.RESET_SELECTED_PRODUCT):
      return {
        selectedProduct: null,
        isLoading: action.payload.isLoading,
      };
    default:
      return state;
  }
}