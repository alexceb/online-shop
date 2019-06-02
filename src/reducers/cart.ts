import { Product, CartItem } from '../typings/model';
import { CartActions } from '../actions/cart';
import { ActionNames } from '../actions/constants';

export interface CartState {
  cart: CartItem[],
  total: number,
}

const initialState: CartState = {
  cart: [],
  total: 0,
}

const decreaseTotal = (total: number, item: CartItem, amount: number = 1): number => 
  total - Number(item.product.price) * amount;

const increaseTotal = (total: number, item: CartItem, amount: number = 1): number => 
  total + Number(item.product.price) * amount;

const updateQuantity = (items: CartItem[], payload: CartItem): CartItem[] => {
  return items.map(item => {
    if (item.product.id === payload.product.id && item.color === payload.color) {
      if (!item.subOption.optionValue) {
        return { ...item, quantity: payload.quantity }
      }
      if (item.subOption.optionValue && (item.subOption.optionValue === payload.subOption.optionValue)) {
        return { ...item, quantity: payload.quantity }
      }
    }
    return item;
  })
};

const filterByItem = (item: CartItem, payload: CartItem): boolean => {
  if (item.product.id !== payload.product.id) {
    return true;
  }
  if (item.color === payload.color) {
    if (!item.subOption.optionValue) {
      return false;
    }
    if (item.subOption.optionValue && (item.subOption.optionValue === payload.subOption.optionValue)) {
      return false;
    }
    return true;
  }
  return true;
}

export const cartReducer = (state = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case (ActionNames.ADD_ITEM_TO_CART):
      const withoutAdded = state.cart.filter(item => filterByItem(item, action.payload));
      const withChangedAmount = state.cart
        .filter(item => !filterByItem(item, action.payload))
        .map(item =>  (
          {
            ...item,
            quantity: item.quantity + 1,
          }
        ));
      const itemsToAdd = withChangedAmount.length ? withChangedAmount : [action.payload];
      return {
        ...state,
        cart: withoutAdded.length ? [...withoutAdded, ...itemsToAdd] : [...itemsToAdd],
        total: increaseTotal(state.total, action.payload),
      }
    case (ActionNames.REMOVE_ITEM_FROM_CART):
      return {
        ...state,
        cart: state.cart.filter(item => filterByItem(item, action.payload)),
        total: decreaseTotal(state.total, action.payload, action.payload.quantity),
      };
    case (ActionNames.INCREASE_AMOUNT):
      return {
        ...state,
        cart: updateQuantity(state.cart, action.payload),
        total: increaseTotal(state.total, action.payload),
      }
    case (ActionNames.DESCRESE_AMOUNT):
      return {
        ...state,
        cart: updateQuantity(state.cart, action.payload),
        total: decreaseTotal(state.total, action.payload),
      }
    default:
      return state;
  }
}