import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { fetchAllProducts } from '../api/fetcher';
import { Product } from '../models/models';

interface ProductsState {
	products: Array<Product>;
	idsForProductsInCart: Array<number>;
	productsInCart: Array<Product>;
	descProductId: number;
	createProductsListFromJson: () => Promise<void>;
	onButtonClick: (id: number, addToCart: boolean) => void;
	addProductToCart: (id: number) => void;
	removeProductFromCart: (id: number) => void;
	createCartListFromData: () => void;
	setDescProductId: (id: number) => void;
	clearDescProductId: () => void;
}

export const useProductsStore = create<ProductsState>()(
	persist(
		(set, get) => ({
			//
			products: [],
			idsForProductsInCart: [],
			productsInCart: [],
			descProductId: 0,
			//
			//
			createProductsListFromJson: async () => {
				if (get().products.length === 0) {
					const productsJson = await fetchAllProducts();
					let products: Array<Product> = [];
					for (let i = 0; i < productsJson.length; i++) {
						products.push(Product.fromJson(productsJson[i]));
					}
					set({ products: [...products] });
				}
			},
			//
			onButtonClick: (id: number, addToCart: boolean) => {
				addToCart ? get().addProductToCart(id) : get().removeProductFromCart(id);
			},
			//
			addProductToCart: (id: number) => {
				if (!get().idsForProductsInCart.filter((productId) => productId === id)[0]) {
					const productToCart: Product = get().products.filter((product) => product.id === id)[0];
					set((state) => ({
						idsForProductsInCart: [...state.idsForProductsInCart, id],
						productsInCart: [...state.productsInCart, productToCart],
					}));
				}
			},
			//
			removeProductFromCart: (id: number) => {
				const newProductIds: Array<number> = get().idsForProductsInCart.filter((productId) => productId !== id);
				const newProductsInCart: Array<Product> = get().productsInCart.filter((product) => product.id !== id);
				set({
					idsForProductsInCart: newProductIds,
					productsInCart: newProductsInCart,
				});
			},
			//
			createCartListFromData: async () => {
				await get().createProductsListFromJson();
				if (get().idsForProductsInCart.length !== get().productsInCart.length) {
					let productsInCart: Array<Product> = [];
					for (let i = 0; i < get().idsForProductsInCart.length; i++) {
						productsInCart.push(
							get().products.filter((product) => product.id === get().idsForProductsInCart[i])[0]
						);
					}
					set({ productsInCart: [...productsInCart] });
				}
			},
			//
			setDescProductId: (id: number) => {
				set({ descProductId: id });
			},
			//
			clearDescProductId: () => {
				set({ descProductId: 0 });
			},
			//
		}),
		{
			name: 'products-store',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
