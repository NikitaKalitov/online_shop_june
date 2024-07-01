import * as React from "react";
import styles from "./Loader.module.scss";

export const Loader = () => {
  return <span className={styles.loader}></span>;
};

export const LoaderView = () => {
  return (
    <div className={styles.loader_view}>
      <Loader />
    </div>
  );
};
