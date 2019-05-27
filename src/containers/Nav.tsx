import { connect, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Nav, NavigationProps } from '../components/Nav/Nav';
import { AppState } from '../reducers';

const mapStateToProps = (state: AppState) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);