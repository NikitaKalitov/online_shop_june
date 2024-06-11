import { create } from "zustand";
import { fetchAllProducts } from "../api/fetcher";
import { Product } from "../models/models";

interface ProductsState {
  products: Array<Product>;
  idsForProductsInCart: Array<number>;
  productsInCart: Array<Product>;
  createProductsListFromJson: () => Promise<void>;
  addProductToCart: (id: number) => void;
  createCartListFromData: () => void;
}

export const useProductsStore = create<ProductsState>()((set, get) => ({
  //
  products: [],
  idsForProductsInCart: [],
  productsInCart: [],
  //
  //
  createProductsListFromJson: async () => {
    if (useProductsStore.getState().products.length === 0) {
      const productsJson = await fetchAllProducts();
      let products: Array<Product> = [];
      for (let i = 0; i < productsJson.length; i++) {
        products.push(Product.fromJson(productsJson[i]));
      }
      set({ products: [...products] });
    }
  },
  //
  addProductToCart: (id: number) => {
    if (
      !get().idsForProductsInCart.filter((productId) => productId === id)[0]
    ) {
      const productToCart: Product = get().products.filter(
        (product) => product.id === id
      )[0];
      set((state) => ({
        idsForProductsInCart: [...state.idsForProductsInCart, id],
        productsInCart: [...state.productsInCart, productToCart],
      }));
    }
  },
  //
  createCartListFromData: async () => {
    await get().createProductsListFromJson();
    if (get().idsForProductsInCart.length !== get().productsInCart.length) {
      let productsInCart: Array<Product> = [];
      for (let i = 0; i < get().idsForProductsInCart.length; i++) {
        productsInCart.push(
          get().products.filter(
            (product) => product.id === get().idsForProductsInCart[i]
          )[0]
        );
      }
      set({ productsInCart: [...productsInCart] });
    }
  },
  //
}));
