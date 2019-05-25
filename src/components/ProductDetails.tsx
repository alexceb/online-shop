import * as React from 'react';
import { Product } from '../typings/model';
import { useEffect } from 'react';
import { RouteComponentProps } from "react-router";

interface ProductDetailsMatchParams {
  id: string;
}

export interface ProductDetailsProps extends RouteComponentProps< ProductDetailsMatchParams > {
  product: Product,
  getProductById: (id: number) => void,
};

export const ProductDetails: React.FC<ProductDetailsProps> = props => {

  const { match, product, getProductById } = props;

  useEffect(() => {
    const productId = Number(match.params.id);
    getProductById(productId);
  }, [match]);

  return (
    <section className="ProductDetails">
      <h1>Product details page</h1>
      {product ? (
        <>
          <p>{product.name}</p>
          <p>Brand: {product.brand}</p>
          <p>$ {product.price}</p>
        </>
      ) : (
        <div>Loading ...</div>
      )}
      
    </section>
  )

}
