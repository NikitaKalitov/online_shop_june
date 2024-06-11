import React, { useEffect } from "react";
import { Card } from "../../components/Card/Card";
import { Loader } from "../../components/Loader/Loader";
import { useProductsStore } from "../../store/productsStore";
import styles from "./AllProductsPage.module.css";

export const AllProductsPage = () => {
  const createProductsListFromJson = useProductsStore(
    (state) => state.createProductsListFromJson
  );
  const products = useProductsStore((state) => state.products);

  useEffect(() => {
    createProductsListFromJson();
  });

  return (
    <>
      {products.length === 0 ? (
        <LoaderView />
      ) : (
        <ProductsListView products={products} />
      )}
    </>
  );
};

const LoaderView = () => {
  return (
    <div className={styles.loader_view}>
      <Loader />
    </div>
  );
};

const ProductsListView = ({ products }) => {
  return (
    <div className={styles.products_list_view}>
      {products.map(function (product) {
        return <Card product={product} key={product.id} />;
      })}
    </div>
  );
};
