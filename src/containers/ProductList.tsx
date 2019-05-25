import { connect } from 'react-redux';
import { ProductList, ProductListProps } from '../components/ProductList';
import { AppState } from '../reducers';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';
import { onGetData } from '../actions/products';
import { ThunkDispatch } from 'redux-thunk';

const mapStateToProps = (state: AppState, ownProps: ProductListProps) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getProducts: () => dispatch(onGetData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
