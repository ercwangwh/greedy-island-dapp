import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { ConnectWallet } from "@thirdweb-dev/react";
import Header from "../components/Header";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        {/* Top Section */}
        <h1 className={styles.h1}>
          Welcome To Greedy Island - An NFT Staking Game
        </h1>
        <p>1. Mint your character</p>
        <p>2. Mint the test NFT through NFT drop faucet</p>
        <p>3. Stake the NFT to earn coins</p>
        <p>
          4. Use the coins to update your skills which can boost your coins
          reward
        </p>
        <div className={styles.nftBoxGrid}>
          <div
            className={styles.optionSelectBox}
            role="button"
            onClick={() => router.push(`/character`)}
          >
            {/* Mint Character */}
            <img src={`/icons/drop.webp`} alt="drop" />
            <h2 className={styles.selectBoxTitle}>Mint Character</h2>
            <p className={styles.selectBoxDescription}>
              Use the Character Contract to claim a Character NFT.
            </p>
          </div>
          <div
            className={styles.optionSelectBox}
            role="button"
            onClick={() => router.push(`/mint`)}
          >
            {/* Mint a new NFT */}
            <img src={`/icons/drop.webp`} alt="drop" />
            <h2 className={styles.selectBoxTitle}>NFT Drop Faucet</h2>
            <p className={styles.selectBoxDescription}>
              Use the NFT Drop Contract to claim a test NFT from the collection.
            </p>
          </div>

          <div
            className={styles.optionSelectBox}
            role="button"
            onClick={() => router.push(`/stake`)}
          >
            {/* Staking an NFT */}
            <img src={`/icons/token.webp`} alt="drop" />
            <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
            <p className={styles.selectBoxDescription}>
              Use the staking contract to stake your NFTs, and earn coins from
              the <b>Coin</b> contract.
            </p>
          </div>
        </div>
        <p className={styles.footer}>New Feature Coming Soon...</p>
      </div>
    </div>
  );
};

export default Home;
