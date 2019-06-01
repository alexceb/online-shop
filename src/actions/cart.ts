import { ActionNames } from './constants';
import { CartItem } from '../typings/model';

interface RemoveItemAction {
  type: typeof ActionNames.REMOVE_ITEM_FROM_CART
  payload: CartItem
}

interface UpdateItemQuantityAction {
  type: typeof ActionNames.INCREASE_AMOUNT | ActionNames.DESCRESE_AMOUNT,
  payload: CartItem
}

interface AddItemAction {
  type: typeof ActionNames.ADD_ITEM_TO_CART
  payload: CartItem
}

export type CartActions = 
  RemoveItemAction | 
  UpdateItemQuantityAction |
  AddItemAction;

export const removeItemFromCart = (item: CartItem): RemoveItemAction => ({
  type: ActionNames.REMOVE_ITEM_FROM_CART,
  payload: item,
});

export const decreaseAmount = (item: CartItem): UpdateItemQuantityAction => ({
  type: ActionNames.DESCRESE_AMOUNT,
  payload: item,
});

export const increaseAmount = (item: CartItem): UpdateItemQuantityAction => ({
  type: ActionNames.INCREASE_AMOUNT,
  payload: item,
});

export const addItemToCart = (item: CartItem): AddItemAction => ({
  type: ActionNames.ADD_ITEM_TO_CART,
  payload: item,
});
