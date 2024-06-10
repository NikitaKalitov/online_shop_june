import React, { useEffect } from "react";
import { useProductsStore } from "../../store/productsStore";

export const AllProductsPage = () => {
  const createProductsListFromJson = useProductsStore((state) => (state.createProductsListFromJson));
  const products = useProductsStore((state) => (state.products));

  useEffect(() => {
    createProductsListFromJson();
  }, []);

  return <div>{products.length}</div>;
};
