import { faCartShopping, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useNavigationStore } from '../../stores/navigationStore';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <Link icon={faList} text={'Продукты'} goTo={useNavigationStore.getState().goToAllProductsPage} />
        <Link icon={faCartShopping} text={'Корзина'} goTo={useNavigationStore.getState().goToCartPage} />
      </div>
    </div>
  );
};

const Link = ({ icon, text, goTo }) => {
  return (
    <div
      onClick={() => {
        goTo();
      }}
    >
      <p className={styles.link}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        {text}
      </p>
    </div>
  );
};
