import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import styles from "./Header.module.scss";
import { useLocation } from "react-router-dom";

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

const getWindowWidth = () => {
  const width = window.innerWidth;
  return width;
}

const ToggleSidebar = () => {
  const [visible, setVisible] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);

  const location = useLocation();
  const onClick = () => {
    const sidebar = document.getElementById("sidebar");
    if (visible) {
      sidebar.style.display = "none";
    } else {
      sidebar.style.display = "block";
      sidebar.style.position = "absolute";
    }
    setVisible((visible) => !visible);
  };

  // React.useEffect(() => {
  //   function handleResize() {
  //     setWidth(getWindowWidth());
  //   }

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  // if (width >= 700 && sidebar.style.display == "none") {
  //   document.getElementById('sidebar_toggle_button').click();
  // }

  return (
    <div
      className={styles.toggle_sidebar}
      onClick={onClick}
      style={
        location.pathname.includes("auth_warning") ||
          location.pathname.includes("login")
          ? { display: "none" }
          : {}
      }
      id={'sidebar_toggle_button'}
    >
      <FontAwesomeIcon icon={faBars} />
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
