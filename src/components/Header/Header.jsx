import React from "react";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <p>Продукты</p>
      <p>Корзина</p>
    </div>
  );
};
