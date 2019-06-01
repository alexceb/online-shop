import * as React from 'react';

import * as styles from './ProductItem.scss';
import { Product } from '../../typings/model';
import { NavLink } from 'react-router-dom';

interface ProductItemProps {
  product: Product,
}

export const ProductItem: React.FC<ProductItemProps> = props => {
  const { product } = props;

  return (
    <>
      {product.available ? (
        <NavLink to={`details/${product.id}`} className={styles.productItem}>
          <div className={styles.productItemWrapper}>
            <div>{product.name}</div>
          </div>
        </NavLink>
      ) : null}
    </>
  )
};
