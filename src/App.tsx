import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as styles from './index.scss';
import { Checkout } from './components/Checkout';
import ProductList from './containers/ProductList';
import ProductDetails from './containers/ProductDetails';
import Nav from './containers/Nav';

export const App: React.FC = () => {
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