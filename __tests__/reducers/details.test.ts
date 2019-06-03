import { ActionNames } from '../../src/actions/constants';
import { DetailsState, detailsReducer } from '../../src/reducers/details';
import { DetailsActions } from '../../src/actions/details';
import { Product } from '../../src/typings/model';
import { isInferredPredicate } from '@babel/types';

const initialState: DetailsState = {
  selectedProduct: null,
  isLoading: true,
  error: null,
};

const initialAction: any = {
  type: null
};

const product: Product = {
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

const products: Product[] = [
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
        quantity: 10,
      }
    ],
  }
];

describe('Products page reducer', () => {
  it('Returns initial state', () => {
    expect(detailsReducer(undefined, initialAction)).toEqual(initialState);
  });

  it('Receive error and sets loading as false when getting GET_PRODUCT_BY_ID_ERROR', () => {
    const action: DetailsActions = {
      type: ActionNames.GET_PRODUCT_BY_ID_ERROR,
      payload: {
        error: Error('message'),
        isLoading: false,
      },
    };

    expect(detailsReducer(initialState, action)).toStrictEqual({
      ...initialState,
      isLoading: action.payload.isLoading,
      error: action.payload.error,
    })
  });

  it('Resets the selected product by setting to null when getting RESET_SELECTED_PRODUCT', () => {
    const action: DetailsActions = {
      type: ActionNames.RESET_SELECTED_PRODUCT,
      payload: {
        isLoading: true,
      }
    };

    const stateWithProduct: DetailsState = {
      selectedProduct: product,
      isLoading: false,
      error: null,
    }

    expect(detailsReducer(stateWithProduct, action)).toStrictEqual({
      ...stateWithProduct,
      selectedProduct: null,
      isLoading: action.payload.isLoading,
    })
  });

  describe('Sets selected product after getting GET_PRODUCT_BY_ID_SUCCESS', () => {
    it('Gets data from response if there is no preloaded products', () => {
      const action: DetailsActions = {
        type: ActionNames.GET_PRODUCT_BY_ID_SUCCESS,
        payload: {
          product,
          products: [],
          isLoading: false,
        }
      };

      expect(detailsReducer(initialState, action)).toStrictEqual({
        ...initialState,
        isLoading: action.payload.isLoading,
        selectedProduct: action.payload.product,
      })
    });
    it('Gets the selectedProduct with updated data from products', () => {
      const action: DetailsActions = {
        type: ActionNames.GET_PRODUCT_BY_ID_SUCCESS,
        payload: {
          product,
          products,
          isLoading: false,
        }
      };

      expect(detailsReducer(initialState, action)).toStrictEqual({
        ...initialState,
        isLoading: action.payload.isLoading,
        selectedProduct: {
          id: 8,
          name: "Samsung 40 UHD Smart TV",
          brand: "SAMSUNG",
          price: "3200",
          available: true,
          weight: 8.2,
          options: [
            {
              color: "black",
              quantity: 10,
            }
          ],
        },
      })
    });
  });
});
