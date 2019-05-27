import { combineReducers } from "redux";

import { productsReducer } from "./products";
import { detailsReducer } from "./details";
import { cartReducer } from "./cart";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  details: detailsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
