import React, { useEffect } from "react";
import { useProductsStore } from "../../store/productsStore";

export const CartPage = () => {
  const products = useProductsStore((state) => state.productsInCart);
  // const createCartListFromData = useProductsStore(
  //   (state) => state.createCartListFromData
  // );

  // useEffect(() => {
  //   createCartListFromData();
  // });

  return <div>{products.length}</div>;
};
