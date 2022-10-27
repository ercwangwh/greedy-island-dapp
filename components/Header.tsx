import React from "react";
import styles from "../styles/Home.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";

function Header() {
  return (
    <div className={styles.header}>
      <h1 className={styles.left}>Greedy Island - v0.1.0</h1>
      <div className={styles.right}>
        <ConnectWallet colorMode="dark"></ConnectWallet>
      </div>
    </div>
  );
}

export default Header;
