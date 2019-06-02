import { ActionNames } from '../actions/constants';
import { ProductActions } from '../actions/products';
import { Product, CartItem, ProductOption } from '../typings/model';

export interface ProductsState {
  data: Product[]
  isLoading: boolean
}

const initialState: ProductsState = {
  data: [],
  isLoading: true,
};

const getConfiguredData = (
    data: Product[],
    payload: { item: CartItem, amount: number },
    increase: boolean
  ) => {

  let changedOptions;

  const changedQuantity = (value: number, increase: boolean, amount: number) => {
    return increase ? (value + amount) : (value - amount);
  };

  const getAvailability = (options: ProductOption[]): boolean => {
    return options.reduce((curr: number, next: ProductOption) => {
      if (next.quantity > 0) {
        return curr + next.quantity
      };
      return curr;
    }, 0) > 0;
  };

  return data
    .map(item => {
      if (item.id === payload.item.product.id) {
        changedOptions = item.options.map(option => {
          if (option.color === payload.item.color) {
            return {
              ...option,
              quantity: changedQuantity(option.quantity, increase, payload.amount),
            }
          }
          return option;
        });
        return {
          ...item,
          options: changedOptions,
          available: getAvailability(changedOptions),
        };
      }
      return item;
    })
}

export const productsReducer = (state = initialState, action: ProductActions): ProductsState => {
  let increase;
  switch (action.type) {
    case (ActionNames.RECEIVED_DATA):
      return {
        ...state,
        data: action.payload.data,
        isLoading: action.payload.isLoading,
      }
    case (ActionNames.RECEIVED_DATA_ERROR):
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case (ActionNames.INCREASE_AMOUNT_IN_STOCK):
      increase = true;
      return {
        ...state,
        data: getConfiguredData(state.data, action.payload, increase)
      }
    case (ActionNames.DECREASE_AMOUNT_IN_STOCK):
      increase = false;
      return {
        ...state,
        data: getConfiguredData(state.data, action.payload, increase)
      }
    default:
      return state;
  }
}
