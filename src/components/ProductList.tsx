import * as React from 'react';
import { useEffect } from 'react';

import { getInitialData } from '../actions/services';
import { Product } from '../typings/model';

export type ProductListProps = {
  products: Product[],
  getProducts: () => void;
};

export const ProductList: React.FC<ProductListProps> = props => {

  const { products, getProducts } = props;

  useEffect(() => {
    getProducts();
  });
  
  return (
    <section className="ProductList">
      <h1>Product list page</h1>
      {
        products.map((item: Product) => (
          <div key={item.id}>
            <span>Product name: {item.name}</span>
            <button>Add to cart</button>
          </div>
        ))
      }
    </section>
  )
}
