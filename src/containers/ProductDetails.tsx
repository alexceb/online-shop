import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter } from 'react-router-dom';

import { ProductDetails, ProductDetailsProps } from '../components/ProductDetails';
import { AppState } from '../reducers';

import { onGetProductById } from '../actions/details';

const mapStateToProps = (state: AppState, ownProps: ProductDetailsProps) => ({
  product: state.selectedProduct,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getProductById: (id: number) => dispatch(onGetProductById(id)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetails));