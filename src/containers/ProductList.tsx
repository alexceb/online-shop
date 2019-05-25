import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { withRouter } from 'react-router-dom';

import { ProductList, ProductListProps } from '../components/ProductList';
import { Product } from '../typings/model';
import { AppState } from '../reducers';

import { onGetData } from '../actions/products';
import { resetSelectedProduct } from '../actions/details';

const mapStateToProps = (state: AppState, ownProps: ProductListProps) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getProducts: () => dispatch(onGetData()),
    resetSelectedProduct: () => dispatch(resetSelectedProduct()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
