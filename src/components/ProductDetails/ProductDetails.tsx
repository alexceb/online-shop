import * as React from 'react';
import { RouteComponentProps } from "react-router";

import { Product, ProductOption } from '../../typings/model';
import { useEffect, useState } from 'react';
import * as styles from './ProductDetails.scss';

interface ProductDetailsMatchParams {
  id: string;
}

export interface ProductDetailsProps extends RouteComponentProps< ProductDetailsMatchParams > {
  product: Product,
  isLoading: boolean,
  getProductById: (id: number) => void,
};

export const ProductDetails: React.FC<ProductDetailsProps> = props => {

  const { 
    match,
    product,
    isLoading,
    getProductById
  } = props;

  const [productOptions, setProductOptions] = useState<Array<string | number> | undefined>([]);

  useEffect(() => {
    const productId = Number(match.params.id);
    getProductById(productId);
  }, [match]);

  useEffect(()=> {
    product && setSubOptions(product.options[0]);
  }, [product]);

  const OptionSelector = (props: any) => {
    const { options } = props;
    return (
      <div className={styles.optionsContainer}>
        {options.map((option: string | number) => (
          <a href="" className={styles.selectableOption}>
            <span className={styles.textLabel}>{option}</span>
          </a>
        ))}
      </div>
    )
  }

  const setSubOptions = (option: ProductOption) => {
    if (option.hasOwnProperty('power')) {
      setProductOptions(option.power);
    } else if (option.hasOwnProperty('storage')) {
      setProductOptions(option.storage);
    }
  }

  const handleColorSelect = (option: ProductOption, event: any): void => {
    event.preventDefault();
    setSubOptions(option);
  }

  return (
    <section className={styles.productDetails}>
      {!isLoading ? (
        <>
          <h3>{product.name}</h3>
          <p>Brand: {product.brand}</p>
          <p>Price: ${product.price}</p>
          <p>Weight: {product.weight}</p>
          <p>Availability: {product.available ? 
            (<span>IN STOCK</span>) 
            : 
            (<span>OUT OF STOCK</span>)}
          </p>
          <div className={styles.optionsContainer}>
            {product.options.map(option => (
              <>
                <a href="" onClick={(event) => handleColorSelect(option, event)} className={styles.selectableOption}>
                  <span className={styles.colorLabel} style={{backgroundColor: option.color}}></span>
                  <span className={styles.textLabel}>{option.color}</span>
                </a>              
              </>
            ))}
          </div>
          <OptionSelector options={productOptions} />
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </section>
  )

}
