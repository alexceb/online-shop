import * as React from 'react';
import * as styles from './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  )
}
