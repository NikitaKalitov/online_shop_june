import { faCartShopping, faList } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigationStore } from "../../store/navigationStore";
import { Link } from "../Link/Link";
import styles from "./Header.module.css";

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
