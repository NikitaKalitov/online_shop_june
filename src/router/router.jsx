import * as React from 'react'
import { AllProductsPage } from '../pages/AllProductsPage/AllProductsPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { ProductDescPage } from '../pages/ProductDescPage/ProductDescPage';
import { useNavigationStore } from '../stores/navigationStore';

export const Router = () => {

  const currentPage = useNavigationStore((state) => (state.currentPage));

  const returnCurrentPageElement = () => {
    switch (currentPage) {
      case 'allProductsPage':
        return <AllProductsPage />;
      case 'cartPage':
        return <CartPage />;
      case 'productDescPage':
        return <ProductDescPage />;
      default:
        return AllProductsPage;
    }
  };

  return (
    <>{returnCurrentPageElement()}</>
  )
}
