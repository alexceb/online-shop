import { combineReducers } from "redux";

import { Product } from "../typings/model";

import { productsReducer } from "./products";
import { detailsReducer } from "./details";

export type AppState = {
  products: Product[],
  cart: any[],
  selectedProduct: any,
};

export const initialState: AppState = {
  products: [],
  cart: [],
  selectedProduct: null,
};

const rootReducer = combineReducers({
  products: productsReducer,
  selectedProduct: detailsReducer,
});

export default rootReducer;
