import { create } from "zustand";
import { Product } from "../models/models";

interface ShopState {
  products: Array<Product>;
  addProduct: (title: String) => void;
}

export const useShopState = create<ShopState>()((set) => ({
  products: [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      thumbnail: "",
      isInCart: false,
    },
    {
      id: 2,
      title: "Eyeshadow Palette with Mirror",
      thumbnail: "",
      isInCart: false,
    },
    { id: 3, title: "Powder Canister", thumbnail: "", isInCart: false },
  ],
  addProduct: (title: String) =>
    set((state) => {
      const id = state.products.pop().id + 1;
      const newProduct = { id: id, title: title, isInCart: false };
      return { products: [...state.products, newProduct] };
    }),
}));

export const useNavigation = create((set) => ({
  currentPage: "",
}));
