import React from "react";
import { Header } from "../../components/Header/Header";
import { AllProductsPage } from "../../pages/AllProductsPage/AllProductsPage";
import { CartPage } from "../../pages/CartPage/CartPage";
import { useNavigationStore } from "../../stores/navigationStore";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

const Body = () => {
  const currentPage = useNavigationStore((state) => state.currentPage);

  return (
    <>
      {currentPage === "allProductsPage" ? <AllProductsPage /> : <CartPage />}
    </>
  );
};
