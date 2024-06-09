import { faCartShopping, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <p>
          <FontAwesomeIcon icon={faList} className={styles.icon} />
          Продукты
        </p>
        <p>
          <FontAwesomeIcon icon={faCartShopping} className={styles.icon} />
          Корзина
        </p>
      </div>
    </div>
  );
};
