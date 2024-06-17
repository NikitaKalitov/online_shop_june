import * as React from "react";
import styles from "./ProductList.module.scss";
import { Card, CartCard } from "./Card/Card";

export const ProductsListView = ({ products, isAllProductsPage }) => {
  return (
    <div className={styles.products_list_view}>
      {isAllProductsPage ? products.map(function (product) {
        return (
          <Card
            product={product}
            key={product.id}
          />
        );
      }) : products.map(function (product) {
        return (
          <CartCard
            product={product}
            key={product.id}
          />
        );
      })}
    </div>
  );
};
