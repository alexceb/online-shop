import { ActionNames } from '../../src/actions/constants';
import { CartState, cartReducer } from '../../src/reducers/cart';
import { CartActions } from '../../src/actions/cart';
import { CartItem } from '../../src/typings/model';

const initialState: CartState = {
  cart: [],
  total: 0,
};

const initialAction: any = {
  type: null
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

const cartWithProduct: CartState = {
  cart: [cartItem],
  total: 1000,
};

const cartWithAnotherProduct: CartState = {
  cart: [
    {
      product: {
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
      },
      quantity: 1,
      color: 'black',
      subOption: {
        optionType: null,
        optionValue: null,
      }
    },
  ],
  total: 3200,
};

describe('Checkout page reducer', () => {
  it('Returns initial state', () => {
    expect(cartReducer(undefined, initialAction)).toEqual(initialState);
  });

  describe('Adds item to cart when getting ADD_ITEM_TO_CART', () => {
    it('Adds a new item when the cart is empty', () => {
      const action: CartActions = {
        type: ActionNames.ADD_ITEM_TO_CART,
        payload: cartItem,
      };
  
      expect(cartReducer(initialState, action)).toStrictEqual({
        ...initialState,
        cart: [action.payload],
        total: Number(action.payload.product.price),
      })
    });
    it('Adds a separate item in cart for the same product but different options', () => {
      const action: CartActions = {
        type: ActionNames.ADD_ITEM_TO_CART,
        payload: {
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
          quantity: 1,
          color: 'red',
          subOption: {
            optionType: 'power',
            optionValue: 6.5,
          }
        }
      };

      expect(cartReducer(cartWithProduct, action)).toStrictEqual({
        cart: [
          ...cartWithProduct.cart,
          action.payload,
        ],
        total: 1500,
      });
      expect(cartReducer(cartWithProduct, action).total)
        .toBe(Number(cartWithProduct.total) + Number(action.payload.product.price));
    });
    
    it('Merges received cart item with the existing in cart if their configuration are the same', () => {
      const action: CartActions = {
        type: ActionNames.ADD_ITEM_TO_CART,
        payload: {
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
          quantity: 1,
          color: 'white',
          subOption: {
            optionType: 'power',
            optionValue: 6.5,
          }
        }
      };

      expect(cartReducer(cartWithProduct, action)).toStrictEqual({
        cart: [
          {
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
              optionValue: 6.5,
            }
          }
        ],
        total: 1500,
      });
    });
  });

  it('Removes item from cart when getting REMOVE_ITEM_FROM_CART', () => {
    const action: CartActions = {
      type: ActionNames.REMOVE_ITEM_FROM_CART,
      payload: cartItem,
    };

    const cart: CartState = {
      cart: [
        {
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
        },
        {
          product: {
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
          },
          quantity: 1,
          color: 'black',
          subOption: {
            optionType: null,
            optionValue: null,
          }
        },
      ],
      total: 4200,
    };

    expect(cartReducer(cart, action)).toStrictEqual({
      cart: [
        {
          product: {
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
          },
          quantity: 1,
          color: 'black',
          subOption: {
            optionType: null,
            optionValue: null,
          }
        },
      ],
      total: 3200,
    });
  });

  it('Increase the amount of the item when getting INCREASE_AMOUNT', () => {
    const action: CartActions = {
      type: ActionNames.INCREASE_AMOUNT,
      payload: {
        product: {
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
        },
        quantity: 2,
        color: 'black',
        subOption: {
          optionType: null,
          optionValue: null,
        }
      },
    };
    expect(cartReducer(cartWithAnotherProduct, action)).toStrictEqual({
      cart: [
        action.payload,
      ],
      total: 3200 + Number(action.payload.product.price)
    });
  });

  it('Increase the amount of the item when getting DESCRESE_AMOUNT', () => {
    const action: CartActions = {
      type: ActionNames.DESCRESE_AMOUNT,
      payload: {
        product: {
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
        },
        quantity: 1,
        color: 'black',
        subOption: {
          optionType: null,
          optionValue: null,
        }
      },
    };
    expect(cartReducer(cartWithAnotherProduct, action)).toStrictEqual({
      cart: [
        action.payload,
      ],
      total: 3200 - Number(action.payload.product.price)
    });
  });
});