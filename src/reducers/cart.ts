import { Product, CartItem } from '../typings/model';
import { CartActions } from '../actions/cart';
import { ActionNames } from '../actions/constants';

interface CartState {
  cart: CartItem[],
  total: number,
}

const initialState: CartState = {
  cart: [],
  total: 0,
}

const decreaseTotal = (total: number, item: CartItem): number => 
  total - Number(item.product.price) * item.quantity;

const increaseTotal = (total: number, item: CartItem): number => 
  total + Number(item.product.price) * item.quantity;

export const cartReducer = (state = initialState, action: CartActions): CartState => {
  switch (action.type) {
    case (ActionNames.ADD_ITEM_TO_CART):
      return {
        ...state,
        cart: [...state.cart, action.payload],
        total: increaseTotal(state.total, action.payload),
      }
    case (ActionNames.REMOVE_ITEM_FROM_CART):
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload.product.id),
        total: decreaseTotal(state.total, action.payload),
      };
    case (ActionNames.UPDATE_ITEM_QUANTITY):
      const updatedItems = state.cart.map(item => {
        if (item.product.id === action.payload.product.id) {
          return { ...item, quantity: action.payload.quantity }
        }
        return item;
      });
      return {
        ...state,
        cart: updatedItems,
        total: increaseTotal(state.total, action.payload),
      }
    default:
      return state;
  }
}