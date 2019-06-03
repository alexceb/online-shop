import * as React from 'react';
import { RouteComponentProps } from "react-router";

import { Product, ProductOption, SubOption, CartItem } from '../../typings/model';
import { useEffect, useState } from 'react';

import * as styles from './ProductDetails.scss';
import { OptionSelector } from './OptionSelector';
import { Loader } from '../Loader/Loader';
import { Dialog } from '../Dialog/Dialog';

interface ProductDetailsMatchParams {
  id: string
}

export interface ProductDetailsProps extends RouteComponentProps< ProductDetailsMatchParams > {
  products: Product[]
  selectedProduct: Product
  isLoading: boolean
  getProductByIdFromApi: (products: Product[], id: number) => void
  resetProduct: () => void
  addItemToCart: (item: CartItem) => void
  decreaseAmountInStock: (item: CartItem, amount: number) => void
};

export const ProductDetails: React.FC<ProductDetailsProps> = props => {

  const { 
    match,
    history,
    products,
    selectedProduct,
    isLoading,
    getProductByIdFromApi,
    resetProduct,
    addItemToCart,
    decreaseAmountInStock,
  } = props;

  const [product, setProduct] = useState<Product>();
  const [productOptions, setProductOptions] = useState<Array<string | number> | undefined>([]);
  const [color, setColor] = useState<string>();
  const [optionLabel, setOptionLabel] = useState<string>();
  const [option, setOption] = useState<SubOption>({ optionType: null, optionValue: null });
  const [showDialog, setShowDialog] = useState<boolean>(false);


  useEffect(() => {
    const productId = Number(match.params.id);
    getProductByIdFromApi(products, productId);
    return () => {
      resetProduct();
    }
  }, []);

  useEffect(()=> {
    if (selectedProduct && selectedProduct.available) {
      const filteredOptions = selectedProduct.options
        .filter((option: ProductOption) => option.quantity > 0);
      setProduct({
        ...selectedProduct,
        options: filteredOptions,
      });
      setSubOptions(filteredOptions[0]);
    }
  }, [products, selectedProduct]);

  const onSelectSubOption = (value: string | number) => {
    setOption({
      ...option,
      optionValue: value,
    });
  }

  const setSubOptions = (selectedOption: ProductOption) => {
    setColor(selectedOption.color);
    setProductOptions(null);
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
    const cartItem: CartItem = {
      product,
      color,
      subOption: option,
      quantity: 1,
    };
    decreaseAmountInStock(cartItem, 1);
    addItemToCart(cartItem);
    setShowDialog(true);
  }

  const goToCart = (): void => {
    history.push('/checkout');
  }

  const goShopping = (): void => {
    history.push('/');
  }

  return (
    <section className={styles.productDetails}>
      <Dialog visible={showDialog}
              onGoShopping={goShopping} 
              onGoCart={goToCart} />
      {product && !isLoading ? (
        <>
          <h3>{`(${product.brand}) ${product.name}`}</h3>
          <div className={styles.productDetailsContainer}>
            <div className={styles.productInfo}>
              <p className={styles.infoLine}>
                <span className={styles.textLabel}>Price: $</span>{product.price}
              </p>
              <p className={styles.infoLine}>
                <span className={styles.textLabel}>Weight: </span>{product.weight}
              </p>
              <p className={styles.infoLine}>
                <span className={styles.textLabel}>Availability: </span>
                {product.available ? 
                (<span>IN STOCK</span>) 
                : 
                (<span>OUT OF STOCK</span>)}
              </p>
            </div>
            {product.available ? (
              <div className={styles.configuration}>
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
                <div className={styles.buttonContainer}>
                  <button onClick={() => addToCart()} className={styles.button}>Add to cart</button>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  )
}
