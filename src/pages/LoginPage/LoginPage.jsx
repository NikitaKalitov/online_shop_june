import * as React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  return (
    <div className={styles.login_page}>
      <LoginContainer />
    </div>
  );
};

const LoginContainer = () => {
  return (
    <div className={styles.login_container}>
      <LoginText />
      <LoginUsername />
      <LoginPassword />
      <LoginButton />
    </div>
  );
};

const LoginText = () => {
  return <h1>Welcome</h1>;
};

const LoginUsername = () => {
  return (
    <div className={styles.field_container}>
      <input type={"text"} className={styles.field} id={"username_field"} />
    </div>
  );
};

const LoginPassword = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={styles.field_container}>
      <input
        type={visible ? "text" : "password"}
        className={styles.field}
        id={"password_field"}
      />
      <p className={styles.password_checkbox}>
        <input
          type={"checkbox"}
          checked={visible}
          onChange={() => {
            setVisible((value) => !value);
          }}
        />
        <span
          onClick={() => {
            setVisible((value) => !value);
          }}
        >
          Показать пароль
        </span>
      </p>
    </div>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();

  const onClick = async () => {
    // @ts-ignore
    const username = document.getElementById("username_field").value;
    // @ts-ignore
    const password = document.getElementById("password_field").value;
    const isSuccess = await useAuthStore.getState().login(username, password);
    if (isSuccess) {
      navigate("/products");
    }
  };

  return (
    <div className={styles.login_button} onClick={onClick}>
      <span>Log in</span>
    </div>
  );
};
