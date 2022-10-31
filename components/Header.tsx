// import React from "react";
import styles from "../styles/Home.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <div className={styles.header}>
      <button
        className={`${styles.secondaryButton} ${styles.left}`}
        onClick={() => router.push("/")}
      >
        Home
      </button>
      <h1>Greedy Island - v0.1.0</h1>
      <div className={styles.right}>
        <ConnectWallet
          colorMode="dark"
          auth={{
            loginOptional: false,
          }}
        >
          {" "}
        </ConnectWallet>
      </div>
    </div>
  );
}

export default Header;
