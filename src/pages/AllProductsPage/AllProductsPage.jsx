import React, { useEffect } from "react";
import { LoaderView } from "../../components/Loader/Loader";
import { useProductsStore } from "../../stores/productsStore";
import { ProductsListView } from "../../components/ProductList/ProductList";

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
        <ProductsListView products={products} isAllProductsPage={true} />
      )}
    </>
  );
};
