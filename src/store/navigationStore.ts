import { create } from "zustand";

const allPagesArray: Array<string> = ['allProductsPage', 'cartPage'];

interface NavigationState {
  currentPage: string,
  goToAllProductsPage: () => void,
  goToCartPage: () => void,
  changeCurrentPage: (newPage: string) => void,
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  //
  currentPage: allPagesArray[0],
  //
  //
  goToAllProductsPage: () => {
    get().changeCurrentPage('allProductsPage');
  },
  //
  goToCartPage: () => {
    get().changeCurrentPage('cartPage');
  },
  //
  changeCurrentPage: (newPage) => {
    if(get().currentPage != newPage) {
      set({currentPage: newPage});
      console.log(get().currentPage);
    }
  },
  //
}));