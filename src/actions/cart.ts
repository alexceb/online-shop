import { ActionNames } from './constants';
import { CartItem } from '../typings/model';

interface RemoveItemAction {
  type: typeof ActionNames.REMOVE_ITEM_FROM_CART
  payload: CartItem,
}

interface UpdateItemQuantity {
  type: typeof ActionNames.UPDATE_ITEM_QUANTITY
  payload: CartItem,
}

export type CartActions = 
  RemoveItemAction | 
  UpdateItemQuantity;

export const removeItemFromCart = (item: CartItem): RemoveItemAction => ({
  type: ActionNames.REMOVE_ITEM_FROM_CART,
  payload: item,
});

export const updateItemQuantity = (item: CartItem): UpdateItemQuantity => ({
  type: ActionNames.UPDATE_ITEM_QUANTITY,
  payload: item,
});
