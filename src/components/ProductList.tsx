import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from "react-router";

import { Product } from '../typings/model';

export interface ProductListProps extends RouteComponentProps {
  products: Product[],
  getProducts: () => void;
  setSelectedProduct: (product: Product) => void;
  resetSelectedProduct: () => void;
};

export const ProductList: React.FC<ProductListProps> = props => {

  const { 
    products,
    history,
    getProducts,
    resetSelectedProduct,
  } = props;

  useEffect(() => {
    getProducts();
  }, []);

  const goToProductDetails = (id: number) => {
    resetSelectedProduct();
    history.push(`/details/${id}`)
  };
  
  return (
    <section className="ProductList">
      <h1>Product list page</h1>
      {
        products.map((item: Product) => (
          <div key={item.id}>
            <span>Product name: {item.name}</span>
            <button onClick={() => goToProductDetails(item.id)}>Learn more</button>
          </div>
        ))
      }
    </section>
  )
}
