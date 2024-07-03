import {
  faCartShopping,
  faList,
  faRightToBracket,
  faUserCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import styles from "./Sidebar.module.scss";
import "./Sidebar.module.scss";
import { useSidebarStore } from "../../stores/sidebarStore";

export const Sidebar = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <div
      className={styles.sidebar_container}
      style={
        location.pathname.includes("auth_warning") ||
        location.pathname.includes("login")
          ? { display: "none" }
          : {}
      }
    >
      <div className={styles.sidebar_body}>
        <LinkComponent
          to={"products"}
          icon={faList}
          text={"Products"}
          visible={true}
          onClick={() => {}}
        />
        <LinkComponent
          to={"cart"}
          icon={faCartShopping}
          text={"Cart"}
          visible={true}
          onClick={() => {}}
        />
        <LinkComponent
          to={"/account"}
          icon={faUserCircle}
          text={"Account"}
          visible={user}
          onClick={() => {}}
        />
        <LinkComponent
          to={"/login"}
          icon={faRightToBracket}
          text={"Log in"}
          visible={!user}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export const SidebarHamburger = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const visible = useSidebarStore((state) => state.visible);
  const hide = useSidebarStore((state) => state.hide);

  return (
    <div
      className={
        visible ? styles.sidebar_hamburger_container : styles.invisible
      }
      style={
        location.pathname.includes("auth_warning") ||
        location.pathname.includes("login")
          ? { display: "none" }
          : {}
      }
    >
      <div className={styles.sidebar_hamburger_body}>
        <div className={styles.toggle_sidebar} onClick={hide}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <LinkComponent
          to={"products"}
          icon={faList}
          text={"Products"}
          visible={true}
          onClick={hide}
        />
        <LinkComponent
          to={"cart"}
          icon={faCartShopping}
          text={"Cart"}
          visible={true}
          onClick={hide}
        />
        <LinkComponent
          to={"/account"}
          icon={faUserCircle}
          text={"Account"}
          visible={user}
          onClick={hide}
        />
        <LinkComponent
          to={"/login"}
          icon={faRightToBracket}
          text={"Log in"}
          visible={!user}
          onClick={hide}
        />
      </div>
      <div className={styles.sidebar_hamburger_space} onClick={hide}></div>
    </div>
  );
};

const LinkComponent = ({ icon, text, to, visible, onClick }) => {
  const match = useMatch(to);

  return (
    <NavLink
      to={to}
      className={match ? styles.active : ""}
      preventScrollReset={true}
      style={visible ? {} : { display: "none" }}
      onClick={onClick}
    >
      <div className={styles.link_container}>
        <p className={styles.link}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
          {text}
        </p>
      </div>
    </NavLink>
  );
};
