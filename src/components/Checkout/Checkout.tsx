import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { v4 } from 'node-uuid';

import { CartItem, Product, ProductOption } from '../../typings/model';
import * as styles from './Checkout.scss';
import { useEffect } from 'react';

export interface CheckoutProps extends RouteComponentProps {
  cart: CartItem[],
  total: number,
  products: Product[],
  removeItem?: (item: CartItem) => void,
  increaseAmount?: (item: CartItem) => void,
  decreaseAmount?: (item: CartItem) => void,
  increaseAmountInStock?: (item: CartItem, amount: number) => void,
  decreaseAmountInStock?: (item: CartItem, amount: number) => void,
};

export const Checkout: React.FC<CheckoutProps> = props => {

  const { 
    cart, 
    total,
    products,
    removeItem, 
    increaseAmount, 
    decreaseAmount,
    increaseAmountInStock,
    decreaseAmountInStock,
  } = props;

  const canChangeAmount = (item: CartItem, products: Product[]): boolean => {
    const currentAmount = products
      .filter((product: Product) => {
        return product.id === item.product.id;
      })[0]
      .options.filter((option: ProductOption) => {
        return option.color === item.color;
      })[0].quantity;
    
    return currentAmount > 0;
  };
  
  const increase = (item: CartItem) => {
    const payload: CartItem = {
      ...item,
      quantity: item.quantity + 1,
    };
    if (canChangeAmount(item, products)) {
      increaseAmount(payload);
      decreaseAmountInStock(item, 1);
    }
  };

  const decrease = (item: CartItem) => {
    const payload: CartItem = {
      ...item,
      quantity: item.quantity - 1,
    };
    decreaseAmount(payload);
    increaseAmountInStock(item, 1);
  }

  const removeFromCart = (item: CartItem) => {
    removeItem(item);
    increaseAmountInStock(item, item.quantity);
  }

  return (
    <section className="Checkout">
      <div className={styles.checkoutContainer}>
        {cart && cart.length > 0 ? (
          <>
            <ul className={styles.checkoutList}>
              {cart.map((item: CartItem) => (
                <li key={v4()} className={styles.checkoutItemContainer}>
                  <div className={styles.checkoutItemWrapper}>
                    <div className={styles.nameLabel}>{`(${item.product.brand}) ${item.product.name}`}</div>
                    <div>
                      <span className={styles.label}>Color</span>
                      <span>{item.color}</span>
                    </div>
                    {item.subOption.optionType ? (
                      <div>
                        <span className={styles.label}>{item.subOption.optionType}</span>
                        <span>{item.subOption.optionValue}</span>
                      </div>
                    ) : null}
                    <div className={styles.quantity}>
                      {item.quantity !== 1 ? (
                        <button className={styles.quantityButton}
                                onClick={() => decrease(item)}>&#45;</button>
                      ) : null}
                      <span>{item.quantity}</span>
                      <button className={styles.quantityButton}
                              onClick={() => increase(item)}>&#43;</button>
                      <button className={styles.removeButton}
                              onClick={() => removeFromCart(item)}>&times;</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.totalAmount}>
              <span className={styles.nameLabel}>Total: </span>
              <span>{`${total}$`}</span>
            </div>
          </>
        ) : (
          <div className={styles.emptyMessage}>Your cart is empty</div>
        )}
      </div>
    </section>
  );
  
};
