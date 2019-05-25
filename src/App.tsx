import * as React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './components/Checkout';
import ProductList from './containers/ProductList';

export const App: React.FC = () => {
  
  return (
    <Router>
      <div>
        <h1>Online shop</h1>
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={ProductDetails} />
        <Route path="/checkout" component={Checkout} />
      </div>
    </Router>  
  )
}