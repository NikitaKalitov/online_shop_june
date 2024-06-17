import * as React from "react";
import { Header } from "../../components/Header/Header";
import { AllProductsPage } from "../../pages/AllProductsPage/AllProductsPage";
import { CartPage } from "../../pages/CartPage/CartPage";
import { Router } from "../../router/router";
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

  return (
    <>
      <Router />
    </>
  );
};
