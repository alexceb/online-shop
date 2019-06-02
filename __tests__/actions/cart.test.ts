import configureMockStore from 'redux-mock-store';

import { ActionNames } from '../../src/actions/constants';
import { Product, CartItem } from '../../src/typings/model';
import { CartActions, removeItemFromCart, increaseAmount, decreaseAmount, addItemToCart } from '../../src/actions/cart';
import { CartState } from '../../src/reducers/cart';

const mockedProduct: Product = {
  id: 8,
  name: "Samsung 40 UHD Smart TV",
  brand: "SAMSUNG",
  price: "3200",
  available: true,
  weight: 8.2,
  options: [
    {
      color: "black",
      quantity: 19,
    }
  ],
};

const mockedCartItem: CartItem = {
  product: mockedProduct,
  quantity: 2,
  color: 'black',
  subOption: {
    optionType: null,
    optionValue: null,
  }
};

const mockStore = configureMockStore<CartState, CartActions>();
const store = mockStore({
  cart: [],
  total: 0,
});

describe('Checkout page action creators', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('It dispatches REMOVE_ITEM_FROM_CART if we remove item', () => {
    const expected = [
      {
        type: ActionNames.REMOVE_ITEM_FROM_CART,
        payload: mockedCartItem,
      }
    ];
    store.dispatch(removeItemFromCart(mockedCartItem));
    expect(store.getActions()).toEqual(expected);
  });

  it('It dispatches INCREASE_AMOUNT if we remove item', () => {
    const expected = [
      {
        type: ActionNames.INCREASE_AMOUNT,
        payload: mockedCartItem,
      }
    ];
    store.dispatch(increaseAmount(mockedCartItem));
    expect(store.getActions()).toEqual(expected);
  });

  it('It dispatches DESCRESE_AMOUNT if we remove item', () => {
    const expected = [
      {
        type: ActionNames.DESCRESE_AMOUNT,
        payload: mockedCartItem,
      }
    ];
    store.dispatch(decreaseAmount(mockedCartItem));
    expect(store.getActions()).toEqual(expected);
  });

  it('It dispatches ADD_ITEM_TO_CART if we remove item', () => {
    const expected = [
      {
        type: ActionNames.ADD_ITEM_TO_CART,
        payload: mockedCartItem,
      }
    ];
    store.dispatch(addItemToCart(mockedCartItem));
    expect(store.getActions()).toEqual(expected);
  });
});