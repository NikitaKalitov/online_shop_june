import * as React from "react";
import { LoaderView } from "../../components/Loader/Loader";
import { ProductsListView } from "../../components/ProductList/ProductList";
import { useProductsStore } from "../../stores/productsStore";

export const loader = async () => {
  const getAllProducts = useProductsStore.getState().getAllProducts;
  const allProducts = await getAllProducts();
  return allProducts;
};

export const AllProductsPage = () => {
  const products = useProductsStore((state) => state.allProducts);

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
