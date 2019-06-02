import { ActionNames } from '../../src/actions/constants';
import { ProductActions } from '../../src/actions/products';
import { Product, CartItem, ProductOption } from '../../src/typings/model';
import { ProductsState, productsReducer } from '../../src/reducers/products';

const initialState: ProductsState = {
  data: [],
  isLoading: true,
};

const initialAction: any = {
  type: null
};

const stateWithData: ProductsState = {
  data: [
    {
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
    {
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
    }
  ],
  isLoading: false,
};

const cartItem: CartItem = {
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
  quantity: 2,
  color: 'white',
  subOption: {
    optionType: 'power',
    optionValue: 6.5,
  }
};

describe('Products page reducer', () => {
  it('Returns initial state', () => {
    expect(productsReducer(undefined, initialAction)).toEqual(initialState);
  });

  it('Receive data on getting RECEIVED_DATA', () => {
    const action: ProductActions = {
      type: ActionNames.RECEIVED_DATA,
      payload: {
        data: stateWithData.data,
        isLoading: false,
      }
    };

    expect(productsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: action.payload.isLoading,
      data: action.payload.data,
    });
  });

  it('Increase the amount of a product on getting INCREASE_AMOUNT_IN_STOCK', () => {
    const action: ProductActions = {
      type: ActionNames.INCREASE_AMOUNT_IN_STOCK,
      payload: {
        item: cartItem,
        amount: 1,
      },
    };

    expect(productsReducer(stateWithData, action)).toEqual({
      ...stateWithData,
      data: [
        {
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
              quantity: 4,
            },
            {
              color: "red",
              power: [6.5, 9.5],
              quantity: 7,
            },
          ]
        },
        {
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
        }
      ],
    });
  });

  it('Decrease the amount of a product on getting DECREASE_AMOUNT_IN_STOCK', () => {
    const action: ProductActions = {
      type: ActionNames.DECREASE_AMOUNT_IN_STOCK,
      payload: {
        item: cartItem,
        amount: 2,
      },
    };

    expect(productsReducer(stateWithData, action)).toEqual({
      ...stateWithData,
      data: [
        {
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
              quantity: 1,
            },
            {
              color: "red",
              power: [6.5, 9.5],
              quantity: 7,
            },
          ]
        },
        {
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
        }
      ],
    });
  });

  it('Set the loader as false when getting RECEIVED_DATA_ERROR', () => {
    const action: ProductActions = {
      type: ActionNames.RECEIVED_DATA_ERROR,
      payload: {
        error: Error('message'),
        isLoading: false,
      },
    };

    expect(productsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
    })
  });
});
