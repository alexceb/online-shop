import { ActionNames } from '../actions/constants';
import { initialState } from '.';
import { ProductSelectedAction } from '../actions/details';

export type DetailsActions = 
  ProductSelectedAction;

export const detailsReducer = (state = initialState.selectedProduct, action: DetailsActions) => {
  switch (action.type) {
    case (ActionNames.GET_PRODUCT_BY_ID):
      return action.payload;
    case (ActionNames.RESET_SELECTED_PRODUCT):
      return null;
    default:
      return state;
  }
}