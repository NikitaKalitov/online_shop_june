import * as React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import styles from "./AccountPage.module.scss";

export const AccountPage = () => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return (
      <div className={styles.account_page_container}>
        <div className={styles.account_page_body}>
          <AccountAvatar image={user.image} />
          <AccountFirstLastName
            firstName={user.firstName}
            lastName={user.lastName}
          />
          <AccountGender gender={user.gender} />
          <AccountUsername username={user.username} />
          <AccountEmail email={user.email} />
          <AccountLogout />
        </div>
      </div>
    );
  }
};

const AccountAvatar = ({ image }) => {
  return (
    <div className={styles.account_page_avatar}>
      <img src={image} alt={"Avatar"} />
    </div>
  );
};

const AccountFirstLastName = ({ firstName, lastName }) => {
  return (
    <div className={styles.account_first_last_name}>
      <p>
        {firstName} {lastName}
      </p>
    </div>
  );
};

const AccountGender = ({ gender }) => {
  return <div className={styles.account_gender}>
    <p>{gender}</p>
  </div>;
};

const AccountUsername = ({ username }) => {
  return <div className={styles.account_username}>
    <p>{username}</p>
  </div>;
};

const AccountEmail = ({ email }) => {
  return <div className={styles.account_email}>
    <p>{email}</p>
  </div>;
};

const AccountLogout = () => {
  const navigate = useNavigate();
  return <div className={styles.account_logout} onClick={() => {
    navigate("/logout");
  }}><p>Log out</p></div>
}
