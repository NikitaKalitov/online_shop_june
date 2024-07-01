import { faCartShopping, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useMatch } from "react-router-dom";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_content}>
        <LinkComponent to={"products"} icon={faList} text={"Products"} />
        <LinkComponent to={"cart"} icon={faCartShopping} text={"Cart"} />
      </div>
    </div>
  );
};

const LinkComponent = ({ icon, text, to }) => {
  const match = useMatch(to);

  return (
    <p className={styles.link}>
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
