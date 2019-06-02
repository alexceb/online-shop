import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter } from 'react-router-dom';

import { ProductDetails, ProductDetailsProps } from '../components/ProductDetails/ProductDetails';
import { AppState } from '../reducers';

import { resetSelectedProduct, onGetProductByIdFromApi } from '../actions/details';
import { addItemToCart } from '../actions/cart';
import { CartItem, Product } from '../typings/model';
import { decreaseAmountInStock } from '../actions/products';

const mapStateToProps = (state: AppState, ownProps: ProductDetailsProps) => ({
  products: state.products.data,
  selectedProduct: state.details.selectedProduct,
  isLoading: state.details.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getProductByIdFromApi: (products: Product[], id: number) => dispatch(onGetProductByIdFromApi(products, id)),
    resetProduct: () => dispatch(resetSelectedProduct()),
    addItemToCart: (item: CartItem) => dispatch(addItemToCart(item)),
    decreaseAmountInStock: (item: CartItem, amount: number) => dispatch(decreaseAmountInStock(item, amount)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));