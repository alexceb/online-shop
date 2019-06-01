import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter } from 'react-router-dom';

import { Checkout, CheckoutProps } from '../components/Checkout/Checkout';
import { AppState } from '../reducers';
import { CartItem } from '../typings/model';
import { removeItemFromCart, increaseAmount, decreaseAmount,  } from '../actions/cart';
import { increaseAmountInStock, decreaseAmountInStock } from '../actions/products';

const mapStateToProps = (state: AppState, ownProps: CheckoutProps) => ({
  cart: state.checkout.cart,
  total: state.checkout.total,
  products: state.products.data,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    removeItem: (item: CartItem) => dispatch(removeItemFromCart(item)),
    increaseAmount: (item: CartItem) => dispatch(increaseAmount(item)),
    decreaseAmount: (item: CartItem) => dispatch(decreaseAmount(item)),
    increaseAmountInStock: (item: CartItem, amount: number) => dispatch(increaseAmountInStock(item, amount)),
    decreaseAmountInStock: (item: CartItem, amount: number) => dispatch(decreaseAmountInStock(item, amount)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));