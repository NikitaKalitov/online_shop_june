import * as React from "react";
import { ProductsListView } from "../../components/ProductList/ProductList";
import { useProductsStore } from "../../stores/productsStore";

export const loader = async () => {
  const getCartProducts = useProductsStore.getState().getCartProducts;
  const cartProducts = await getCartProducts();
  return cartProducts;
};

export const CartPage = () => {
  const products = useProductsStore((state) => state.cartProducts);

  return <ProductsListView products={products} isAllProductsPage={false} />;
};
