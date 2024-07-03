import {
  faCartShopping,
  faList,
  faRightToBracket,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import styles from "./Sidebar.module.scss";
import "./Sidebar.module.scss";

export const Sidebar = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <div
      className={styles.sidebar_container}
      // className="sidebar_container"
      style={
        location.pathname.includes("auth_warning") ||
          location.pathname.includes("login")
          ? { display: "none" }
          : {}
      }
    // id={"sidebar"}
    >
      <div className={styles.sidebar_body}>
        <LinkComponent
          to={"products"}
          icon={faList}
          text={"Products"}
          visible={true}
        />
        <LinkComponent
          to={"cart"}
          icon={faCartShopping}
          text={"Cart"}
          visible={true}
        />
        <LinkComponent
          to={"/account"}
          icon={faUserCircle}
          text={"Account"}
          visible={user}
        />
        <LinkComponent
          to={"/login"}
          icon={faRightToBracket}
          text={"Log in"}
          visible={!user}
        />
      </div>
    </div>
  );
};

export const SidebarToToggle = () => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  return (
    <div
      className={styles.sidebar_container_to_toggle}
      // className="sidebar_container"
      style={
        location.pathname.includes("auth_warning") ||
          location.pathname.includes("login")
          ? { display: "none" }
          : {}
      }
      id={"sidebar"}
    >
      <div className={styles.sidebar_body}>
        <LinkComponent
          to={"products"}
          icon={faList}
          text={"Products"}
          visible={true}
        />
        <LinkComponent
          to={"cart"}
          icon={faCartShopping}
          text={"Cart"}
          visible={true}
        />
        <LinkComponent
          to={"/account"}
          icon={faUserCircle}
          text={"Account"}
          visible={user}
        />
        <LinkComponent
          to={"/login"}
          icon={faRightToBracket}
          text={"Log in"}
          visible={!user}
        />
      </div>
    </div>
  );
};

const LinkComponent = ({ icon, text, to, visible }) => {
  const match = useMatch(to);

  return (
    <NavLink
      to={to}
      className={match ? styles.active : ""}
      preventScrollReset={true}
      style={visible ? {} : { display: "none" }}
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
