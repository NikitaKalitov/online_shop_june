import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { fetchAllProducts, fetchProductById } from "../api/fetcher";
import { Product } from "../models/models";

interface ProductsStoreState {
  allProducts: Array<Product>;
  cartIds: Array<number>;
  cartProducts: Array<Product>;
  descProduct: Product;

  getAllProducts: () => Promise<Array<Product>>;
  getCartProducts: () => Promise<Array<Product>>;
  getDescProduct: (id: number) => Promise<Product>;
  //
  onButtonClick: (id: number, addToCart: boolean) => void;
  addProductToCart: (id: number) => void;
  removeProductFromCart: (id: number) => void;
}

export const useProductsStore = create<ProductsStoreState>()(
  persist(
    (set, get) => ({
      allProducts: [],
      cartIds: [],
      cartProducts: [],
      descProduct: null,
      //
      //
      getAllProducts: async () => {
        if (get().allProducts.length === 0) {
          const productsJson = await fetchAllProducts();
          let allProducts: Array<Product> = [];
          for (let i = 0; i < productsJson.length; i++) {
            allProducts.push(Product.fromJson(productsJson[i]));
          }
          set({ allProducts: [...allProducts] });
        }
        return get().allProducts;
      },
      //
      getCartProducts: async () => {
        await get().getAllProducts();
        if (get().cartIds.length !== get().cartProducts.length) {
          let cartProducts: Array<Product> = [];
          for (let i = 0; i < get().cartIds.length; i++) {
            cartProducts.push(
              get().allProducts.filter(
                (product) => product.id === get().cartIds[i]
              )[0]
            );
          }
          set({ cartProducts: [...cartProducts] });
        }
        return get().cartProducts;
      },
      //
      getDescProduct: async (id: number) => {
        if (get().descProduct == null || get().descProduct?.id !== id) {
          const product = await fetchProductById(id);
          set({ descProduct: product });
          return product;
        } else {
          return get().descProduct;
        }
      },
      //
      //
      onButtonClick: (id: number, addToCart: boolean) => {
        addToCart
          ? get().addProductToCart(id)
          : get().removeProductFromCart(id);
      },
      //
      addProductToCart: (id: number) => {
        if (!get().cartIds.filter((productId) => productId === id)[0]) {
          const product: Product = get().allProducts.filter(
            (product) => product.id === id
          )[0];
          set((state) => ({
            cartIds: [...state.cartIds, id],
            cartProducts: [...state.cartProducts, product],
          }));
        }
      },
      //
      removeProductFromCart: (id: number) => {
        const newProductIds: Array<number> = get().cartIds.filter(
          (productId) => productId !== id
        );
        const newProductsInCart: Array<Product> = get().cartProducts.filter(
          (product) => product.id !== id
        );
        set({
          cartIds: newProductIds,
          cartProducts: newProductsInCart,
        });
      },
    }),
    {
      name: "products-store-new",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cartIds: state.cartIds,
      }),
    }
  )
);
