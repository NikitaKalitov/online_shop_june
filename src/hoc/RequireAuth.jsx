import * as React from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { LoaderView } from "../components/Loader/Loader";
import styles from "./RequireAuth.module.scss";

export const loader = ({ request }) => {
  const user = useAuthStore.getState().user;

  if (user) {
    const newUrl = request.url.replace("/auth_warning", "");
    console.log(newUrl);
    return redirect(newUrl);
  } else {
    return null;
  }
};

export const RequireAuth = ({ children }) => {
  const user = useAuthStore.getState().user;
  const checkLogin = useAuthStore((state) => state.checkLogin);
  const [loggedIn, setLoggedIn] = React.useState(null);

  React.useEffect(() => {
    checkLogin().then((value) => {
      setLoggedIn(value);
    });
  });

  if (user == null) {
    return <Navigate to={"auth_warning"} replace={true} />;
  }

  if (loggedIn == null) {
    return <LoaderView />;
  } else {
    if (!loggedIn) {
      return <Navigate to={"auth_warning"} replace={true} />;
    } else {
      console.log("return children");
      return <>{children}</>;
    }
  }
};

export const AuthWarning = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.auth_warning_container}>
      <div className={styles.auth_warning_body}>
        <AuthWarningTitle />
        <AuthWarningBody />
        <div className={styles.auth_warning_button_section}>
          <AuthWarningButton
            text={"Войти"}
            onClick={() => {
              navigate("/login");
            }}
          />
          <AuthWarningButton
            text={"На главную"}
            onClick={() => {
              navigate("/products");
            }}
          />
        </div>
      </div>
    </div>
  );
};

const AuthWarningTitle = () => {
  return (
    <div className={styles.auth_warning_title}>
      <h1>Необходимо авторизоваться</h1>
    </div>
  );
};

const AuthWarningBody = () => {
  return (
    <div className={styles.auth_warning_body}>
      <p>Для выполнения этого действия необходимо авторизоваться</p>
    </div>
  );
};

const AuthWarningButton = ({ text, onClick }) => {
  return (
    <div className={styles.auth_warning_button} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
};
