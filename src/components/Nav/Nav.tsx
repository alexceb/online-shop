import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Nav.scss';
import { CartItem } from '../../typings/model';

export interface NavigationProps {
  cart: CartItem[],
};

export const Nav: React.FC<NavigationProps> = props => {
  const { cart } = props;

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <NavLink to="/" exact activeClassName={styles.active}>
            Browse products
          </NavLink>
        </li>
        <li className={styles.navListItem}>
          <NavLink to="/checkout" activeClassName={styles.active}>
            Cart{cart && cart.length ? <span>({cart.length})</span> : null}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
  
};
