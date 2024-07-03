import * as React from "react";
import { Header } from "../../components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import { Sidebar, SidebarHamburger } from "../../components/Sidebar/Sidebar";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={styles.body_layout_container}>
        <Sidebar />
        <SidebarHamburger />
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
};
