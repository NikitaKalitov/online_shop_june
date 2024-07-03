import * as React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import styles from "./LoginPage.module.scss";

export const loader = async () => {
  const user = useAuthStore.getState().user;
  console.log(`user ${user}`);
  if (user) {
    const checkLogin = useAuthStore.getState().checkLogin;
    const authStatus = await checkLogin();
    console.log(`authStatus ${authStatus}`);
    if (authStatus) {
      return redirect("/products");
    }
  } else {
    return null;
  }
};

export const LoginPage = () => {
  return (
    <div className={styles.login_page}>
      <LoginContainer />
    </div>
  );
};

const LoginContainer = () => {
  return (
    <div className={styles.login_body}>
      <LoginText />
      <LoginUsername />
      <LoginPassword />
      <LoginButton />
      <ContinueWithoutLoginButton />
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
          Show password
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

const ContinueWithoutLoginButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.continue_without_login_button} onClick={() => { navigate("/products") }}>
      <span>Continue without login</span>
    </div>
  );
}