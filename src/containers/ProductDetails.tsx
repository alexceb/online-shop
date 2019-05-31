import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter } from 'react-router-dom';

import { ProductDetails, ProductDetailsProps } from '../components/ProductDetails/ProductDetails';
import { AppState } from '../reducers';

import { onGetProductById, resetSelectedProduct } from '../actions/details';
import { addItemToCart } from '../actions/cart';
import { CartItem } from '../typings/model';

const mapStateToProps = (state: AppState, ownProps: ProductDetailsProps) => ({
  product: state.details.selectedProduct,
  isLoading: state.details.isLoading,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getProductById: (id: number) => dispatch(onGetProductById(id)),
    resetProduct: () => dispatch(resetSelectedProduct()),
    addItemToCart: (item: CartItem) => dispatch(addItemToCart(item)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));