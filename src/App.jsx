import React from "react";
import styles from "./App.module.css";
import { MainLayout } from "./layouts/MainLayout/MainLayout";

function App() {
  return (
    <div className={styles.App}>
      <MainLayout />
    </div>
  );
}

export default App;
