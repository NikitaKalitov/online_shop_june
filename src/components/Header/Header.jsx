import { faCartShopping, faList, faRightToBracket, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useMatch } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <LinkComponent to={"products"} icon={faList} text={"Products"} visible={true} />
        <LinkComponent to={"cart"} icon={faCartShopping} text={"Cart"} visible={true} />
        <LinkComponent to={"/account"} icon={faUserCircle} text={"Account"} visible={user} />
        <LinkComponent to={"/login"} icon={faRightToBracket} text={"Log in"} visible={!user} />
      </div>
    </div>
  );
};

const LinkComponent = ({ icon, text, to, visible }) => {
  const match = useMatch(to);



  return (
    <p className={styles.link} style={visible ? {} : { display: "none" }}>
      <NavLink
        to={to}
        className={match ? styles.active : ""}
        preventScrollReset={true}
      >
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        {text}
      </NavLink>
    </p>
  );
};
