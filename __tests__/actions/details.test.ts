import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { DetailsActions, onGetProductByIdFromApi, resetSelectedProduct } from '../../src/actions/details';
import { ActionNames } from '../../src/actions/constants';
import { products } from '../../src/utils/_DATA';
import { Product } from '../../src/typings/model';

type DispatchExts = ThunkDispatch<DetailsState, void, DetailsActions>;
type DetailsState = {
  selectedProduct: any
  isLoading: boolean
}

const mockedProducts = [...products];
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

const middlewares= [thunk];
const mockStore = configureMockStore<DetailsState, DispatchExts>(middlewares);
const store = mockStore({
  selectedProduct: null,
  isLoading: true,
});

describe('Product details page action creators', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('It dispatches GET_PRODUCT_BY_ID_SUCCESS when getting product by ID', () => {
    const expectedActions = [
      { 
        type: ActionNames.GET_PRODUCT_BY_ID_SUCCESS, 
        payload: {
          products: [mockedProduct],
          product: mockedProduct,
          isLoading: false,
        } 
      },
    ];
    const acceptableProductId = 8;

    return store.dispatch(onGetProductByIdFromApi(mockedProducts, acceptableProductId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it('It dispatches GET_PRODUCT_BY_ID_ERROR when requesting product that does not exist', () => {
    const wrongId = 13;
    const expectedActions = [
      {
        type: ActionNames.GET_PRODUCT_BY_ID_ERROR,
        payload: {
          error: `The product with ID:${wrongId} was not found`,
          isLoading: false,
        },
      }
    ];

    return store.dispatch(onGetProductByIdFromApi(mockedProducts, wrongId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })
  });

  it('It dispatches RESET_SELECTED_PRODUCT when reseting selected product', () => {
    const expectedActions = [
      {
        type: ActionNames.RESET_SELECTED_PRODUCT,
        payload: {
          isLoading: true,
        }
      }
    ];
    store.dispatch(resetSelectedProduct());
    expect(store.getActions()).toEqual(expectedActions);
  });
});