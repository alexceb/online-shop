import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from "react-router";

import { Product } from '../../typings/model';
import { ProductItem } from '../ProductItem/ProductItem';
import * as styles from './ProductList.scss';


export interface ProductListProps extends RouteComponentProps {
  products: Product[],
  getProducts: () => void;
};

export const ProductList: React.FC<ProductListProps> = props => {

  const { 
    products,
    getProducts,
  } = props;

  useEffect(() => {
    if (products && products.length == 0) {
      getProducts();
    }
  }, []);
  
  return (
    <section className={styles.productList}>
      { products && products.length ? 
        products.map((item: Product) => (
          <ProductItem product={item}/>
        ))
        :
        (
          <div>Loading ...</div>
        ) 
      }
    </section>
  )
}
