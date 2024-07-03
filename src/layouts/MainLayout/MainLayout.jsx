import * as React from "react";
import { Header } from "../../components/Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import styles from './MainLayout.module.scss';
import { Sidebar, SidebarToToggle } from "../../components/Sidebar/Sidebar";
import { useSidebarStore } from "../../stores/sidebarStore";

export const MainLayout = () => {
  // const toggle = useSidebarStore((state) => state.toggle);
  return (
    <>
      <Header />
      <div className={styles.body_layout_container}>
        <Sidebar />
        <SidebarToToggle />
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
};
