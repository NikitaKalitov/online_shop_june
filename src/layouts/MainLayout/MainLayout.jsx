import React from "react";
import { Header } from "../../components/Header/Header";
import { AllProductsPage } from "../../pages/AllProductsPage/AllProductsPage";
import { CartPage } from "../../pages/CartPage/CartPage";
import { useNavigationStore } from "../../store/navigationStore";

export const MainLayout = () => {

  return (
    <div>
      <Header />
      <Body/>
    </div>
  );
};

const Body = () => {
  
  const currentPage = useNavigationStore((state) => (state.currentPage));

  return (
    <div>
      {currentPage == 'allProductsPage' ? <AllProductsPage /> : <CartPage/>}
    </div>
  );
}