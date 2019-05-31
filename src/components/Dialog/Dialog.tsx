import * as React from 'react';
import * as styles from './Dialog.scss';

export const Dialog: React.FC<any> = props => {
  return (
    <div className={styles.dialogContainer}>
      <div className={styles.dialogContent}>
        This is dialog!
        <button className={styles.continueShopping}>Continue shopping</button>
        <button className={styles.cartButton}>Go to cart</button>
      </div>
    </div>
  )
};