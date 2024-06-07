import React from "react";
import { Header } from "../../components/Header/Header";
import { AllProductsPage } from "../../pages/AllProductsPage/AllProductsPage";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <AllProductsPage />
    </div>
  );
};
