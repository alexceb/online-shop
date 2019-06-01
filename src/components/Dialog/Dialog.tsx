import * as React from 'react';
import * as styles from './Dialog.scss';

interface DialogProps {
  visible: boolean
  onCancel: (value: boolean) => void
  onGoShopping: () => void
  onGoCart: () => void
}

export const Dialog: React.FC<DialogProps> = props => {
  const { visible, onCancel, onGoShopping, onGoCart } = props;
  
  const onCloseDialog = (e: any) => {
    e.preventDefault();
    onCancel(false);
  }

  return (
    <>
      {visible ? (
        <div className={styles.dialogContainer}>
          <div className={styles.dialogContent}>
            {/* <a href="#" className={styles.closeButton} aria-hidden="true"
               onClick={(e) => onCloseDialog(e)}>&times;</a> */}
            <div className={styles.dialogMessage}>You successfully added product to cart</div>
            <div className={styles.bottom}>
              <button className={styles.continueShopping}
                      onClick={() => onGoShopping()}>
                Continue shopping
              </button>
              <button className={styles.cartButton}
                      onClick={() => onGoCart()}>
                Go to cart
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
    
  )
};