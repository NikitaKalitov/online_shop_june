import { create } from 'zustand';
import { useProductsStore } from './productsStore';

const allPagesArray: Array<string> = ['allProductsPage', 'cartPage', 'productDescPage'];

interface NavigationState {
	currentPage: string;
	goToAllProductsPage: () => void;
	goToCartPage: () => void;
	goProductDescPage: (id: number) => void;
	changeCurrentPage: (newPage: string) => void;
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
	goProductDescPage: (id: number) => {
		useProductsStore.getState().setDescProductId(id);
		get().changeCurrentPage('productDescPage');
	},
	//
	changeCurrentPage: (newPage) => {
		if (get().currentPage !== newPage) {
			set({ currentPage: newPage });
		}
	},
	//
}));
