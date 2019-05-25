import * as React from 'react';
import { Product } from '../typings/model';
import { RouteComponentProps } from 'react-router';

export interface CheckoutProps extends RouteComponentProps {
  cart: Product[],
};

export const Checkout: React.FC<CheckoutProps> = props => {

  const { cart } = props;

  return (
    <section className="Checkout">
      <h1>Checkout page</h1>
      {cart && cart.length > 0 ? (
        <ul>
          {cart.map(item => (
            <li>{item.name}</li>
          ))}
        </ul>
      ) : (
        <div>Your cart is empty</div>
      )}
    </section>
  );
  
};
