import { combineReducers } from "redux";

import { Product } from "../typings/model";
import { productsReducer } from "./products";

export type AppState = Readonly<{
  products: Product[],
  cart: [],
}>;

export const initialState: AppState = {
  products: [],
  cart: [],
};

const rootReducer = combineReducers({
  products: productsReducer,
});

export default rootReducer;
