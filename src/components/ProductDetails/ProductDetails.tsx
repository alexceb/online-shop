import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { v4 } from 'node-uuid';

import { Product, ProductOption, SubOption } from '../../typings/model';
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
  const [color, setColor] = useState<string>();
  const [optionLabel, setOptionLabel] = useState<string>();
  const [option, setOption] = useState<SubOption>({ optionType: null, optionValue: null });


  useEffect(() => {
    const productId = Number(match.params.id);
    getProductById(productId);
  }, [match]);

  useEffect(()=> {
    if (product) {
      setSubOptions(product.options[0]);
    }
  }, [product]);;

  const OptionSelector = (props: any) => {
    const { options, label, inputName, onSelect, compareWith } = props;
    return (
      <div className={styles.optionsContainer}>
        <span className={styles.optionSelectorLabel}>{label}</span>
        {options.map((option: any) => {
          const insertedOption = option.color ? option.color : option;
          return(
            <React.Fragment key={v4()}>
              <input type="radio" id={insertedOption} value={insertedOption} name={inputName}
                    onChange={() => onSelect(option)}
                    checked={compareWith === insertedOption} />
              <label htmlFor={insertedOption} className={styles.selectableOption}>
                {option.color ? (
                  <span className={styles.colorLabel} style={{backgroundColor: insertedOption}}></span>
                ) : null}
                <span className={styles.textLabel}>{insertedOption}</span>
              </label>
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  const onSelectSubOption = (value: string | number) => {
    setOption({
      ...option,
      optionValue: value,
    });
  }

  const setSubOptions = (selectedOption: ProductOption) => {
    setColor(selectedOption.color);
    if (selectedOption.hasOwnProperty('power')) {
      setProductOptions(selectedOption.power);
      setOption({
        optionType: 'power', 
        optionValue: selectedOption.power[0],
      });
      setOptionLabel('Power options');
    } else if (selectedOption.hasOwnProperty('storage')) {
      setOptionLabel('Storage options');
      setProductOptions(selectedOption.storage);
      setOption({
        optionType: 'storage', 
        optionValue: selectedOption.storage[0],
      });
    }
  }

  const addToCart = (): void => {
    console.log({
      product,
      color,
      subOption: option,
      quantity: 1,
    })
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
          <OptionSelector options={product.options} 
                          label="Colors"
                          inputName="selectColor"
                          onSelect={setSubOptions}
                          compareWith={color} />
          <OptionSelector options={productOptions} 
                          label={optionLabel}
                          inputName="selectSubOption"
                          onSelect={onSelectSubOption}
                          compareWith={option.optionValue} />
          <button onClick={() => addToCart()} className={styles.addToCart}>Add to cart</button>
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </section>
  )
}
