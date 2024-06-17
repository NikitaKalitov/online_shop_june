import * as React from "react";
import { useProductsStore } from "../../stores/productsStore";

export const ProductDescPage = () => {
  const product = useProductsStore((state) => state.descProductId);
  return <div>{product}</div>;
};
