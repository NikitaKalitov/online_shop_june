import * as React from "react";
import styles from "./App.module.scss";
import { MainLayout } from "./layouts/MainLayout/MainLayout";

function App() {
  return (
    <div className={styles.App}>
      <MainLayout />
    </div>
  );
}

export default App;
