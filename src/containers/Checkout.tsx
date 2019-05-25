import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { withRouter } from 'react-router-dom';

import { Checkout, CheckoutProps } from '../components/Checkout';
import { AppState } from '../reducers';

const mapStateToProps = (state: AppState, ownProps: CheckoutProps) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));