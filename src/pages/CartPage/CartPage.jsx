import React, { useEffect } from "react";
import { useProductsStore } from "../../stores/productsStore";
import { ProductsListView } from "../../components/ProductList/ProductList";

export const CartPage = () => {
  const products = useProductsStore((state) => state.productsInCart);
  const createCartListFromData = useProductsStore((state) => state.createCartListFromData);

  useEffect(() => {
    createCartListFromData();
  })


  return <ProductsListView products={products} isAllProductsPage={false} />;
};
