import React from "react";
import styles from "./ProductList.module.scss";
import { Card } from "./Card/Card";

export const ProductsListView = ({ products, isAllProductsPage }) => {
  return (
    <div className={styles.products_list_view}>
      {products.map(function (product) {
        return (
          <Card
            product={product}
            isAllProductsPage={isAllProductsPage}
            key={product.id}
          />
        );
      })}
    </div>
  );
};
