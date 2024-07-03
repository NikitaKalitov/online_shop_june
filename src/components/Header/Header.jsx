import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import styles from "./Header.module.scss";
import { useLocation } from "react-router-dom";
import { useSidebarStore } from "../../stores/sidebarStore";

export const Header = () => {
  const location = useLocation();
  return (
    <div className={styles.header}>
      <ToggleSidebar />
      <div className={styles.header_content}>
        <span>{getHeaderTitle(location.pathname)}</span>
      </div>
    </div>
  );
};

const ToggleSidebar = () => {
  const visible = useSidebarStore((state) => state.visible);
  const show = useSidebarStore((state) => state.show);
  const location = useLocation();

  return (
    <div
      className={styles.toggle_sidebar}
      onClick={show}
      style={
        location.pathname.includes("auth_warning") ||
        location.pathname.includes("login")
          ? { display: "none" }
          : {}
      }
      id={"sidebar_toggle_button"}
    >
      <FontAwesomeIcon icon={visible ? faXmark : faBars} />
    </div>
  );
};

const getHeaderTitle = (path) => {
  if (path.includes("auth_required")) {
    return "Auth required";
  }
  if (path.includes("/products")) {
    if (path.includes("/products/")) {
      return "Description";
    } else {
      return "Products";
    }
  }
  if (path.includes("/cart")) {
    return "Cart";
  }
  if (path.includes("/account")) {
    return "Account";
  }
  if (path.includes("/login")) {
    return "Welcome";
  }
  return "No data";
};
