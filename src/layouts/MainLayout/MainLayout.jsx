import * as React from "react";
import { Header } from "../../components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
