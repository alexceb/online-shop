import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { increaseAmountInStock, decreaseAmountInStock, ProductActions, onGetData } from '../../src/actions/products';
import { ActionNames } from '../../src/actions/constants';
import { CartItem, Product } from '../../src/typings/model';
import { products } from '../../src/utils/_DATA';

type DispatchExts = ThunkDispatch<ProductsState, void, ProductActions>;
type ProductsState = {
  data: Product[]
  isLoading: boolean
}

const middlewares= [thunk];
const mockStore = configureMockStore<ProductsState, DispatchExts>(middlewares);
const mockedData = [...products];
const store = mockStore({
  data: [],
  isLoading: true,
});


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
  product: {
    id: 1,
    name: "Philips hue bulb",
    brand: "Philips",
    price: "500",
    available: true,
    weight: 0.2,
    options: [
      {
        color: "white",
        power: [6.5, 9.5],
        quantity: 3,
      },
      {
        color: "red",
        power: [6.5, 9.5],
        quantity: 7,
      },
    ]
  },
  quantity: 3,
  color: 'white',
  subOption: {
    optionType: 'power',
    optionValue: '7',
  }
};

describe('Products page action creators', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('It dispatches RECEIVED_DATA action when getting initial data with products', () => {
    const expectedActions = [
      { type: ActionNames.RECEIVED_DATA, payload: { data: mockedData, isLoading: false, } },
    ];

    return store.dispatch(onGetData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  })

  it('It dispatches INCREASE_AMOUNT_IN_STOCK when decreasing cart item from checkout', () => {
    const input = mockedCartItem;
    store.dispatch(increaseAmountInStock(input, 2));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('It dispatches DECREASE_AMOUNT_IN_STOCK when increasing cart item from checkout', () => {
    const input = mockedCartItem;
    store.dispatch(decreaseAmountInStock(input, 1));
    expect(store.getActions()).toMatchSnapshot();
  });

});