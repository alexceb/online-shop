import * as React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from "react-router";
import { v4 } from 'node-uuid';

import * as styles from './ProductList.scss';
import { Product } from '../../typings/model';
import { ProductItem } from '../ProductItem/ProductItem';
import { Loader } from '../Loader/Loader';


export interface ProductListProps extends RouteComponentProps {
  products: Product[],
  isLoading: boolean,
  getProducts: () => void;
};

export const ProductList: React.FC<ProductListProps> = props => {

  const { 
    products,
    isLoading,
    getProducts,
  } = props;
  
  return (
    <section className={styles.productList}>
      {!isLoading ? 
        products.map((item: Product) => (
          <ProductItem product={item} key={v4()}/>
        ))
        :
        (
          <Loader />
        ) 
      }
    </section>
  )
}
