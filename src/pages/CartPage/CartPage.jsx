import React from "react";
import { useProductsStore } from "../../stores/productsStore";
import { ProductsListView } from "../../components/ProductList/ProductList";

export const CartPage = () => {
  const products = useProductsStore((state) => state.productsInCart);

  return <ProductsListView products={products} isAllProductsPage={false} />;
};
