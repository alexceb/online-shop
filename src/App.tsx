import * as React from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import * as styles from './index.scss';
import Checkout from './containers/Checkout';
import ProductList from './containers/ProductList';
import ProductDetails from './containers/ProductDetails';
import Nav from './containers/Nav';
import { AppState } from './reducers';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { onGetData } from './actions/products';
import { Product } from './typings/model';
import { useEffect } from 'react';

interface AppProps {
  products: Product[],
  getData: () => void,
}

const App: React.FC<AppProps> = props => {
  const { products, getData } = props;

  useEffect(() => {
    if (products && products.length == 0) {
      getData();
    }
  }, []);

  return (
    <Router>
      <Nav />
      <div className={styles.container}>
        <Route exact path="/" component={ProductList} />
        <Route path="/details/:id" component={ProductDetails} />
        <Route path="/checkout" component={Checkout} />
      </div>
    </Router>  
  )
}

const mapStateToProps = (state: AppState) => ({
  products: state.products.data,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getData: () => dispatch(onGetData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);