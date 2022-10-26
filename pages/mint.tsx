import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";

const Mint: NextPage = () => {
  const router = useRouter();
  const address = useAddress();

  const characterContractAddress = "0xe52A8d2d1cb213fE8e8F3D4300c3c29D24e74962";
  const { contract, isLoading } = useContract(characterContractAddress);

  async function readSkill() {
    const level_value = await contract?.call("hunter_skill", address);
    console.log("level value", level_value);
    const multiple_value = await contract?.call(
      "hunter_skill_multiple",
      address
    );
    console.log("multiple value", multiple_value);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Mint An NFT!</h1>

      <p className={styles.explain}>
        Here is where we use our <b>NFT Drop</b> contract to allow users to mint
        one of the NFTs that we lazy minted.
      </p>
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <Web3Button
        colorMode="dark"
        accentColor="#5204BF"
        contractAddress="0x4bA36BdD0Ff974DecAd7f277E1A0799FeF60E879"
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => {
          alert("NFT Claimed!");
          router.push(`/stake`);
        }}
        onError={(error) => {
          console.error(error);
          alert(error);
        }}
      >
        Claim An NFT
      </Web3Button>

      <Web3Button
        colorMode="dark"
        accentColor="#5204BF"
        contractAddress="0xe52A8d2d1cb213fE8e8F3D4300c3c29D24e74962"
        action={(contract) => contract.call("summon")}
        onSuccess={() => {
          alert("Character Claimed!");
          router.push(`/stake`);
        }}
        onError={(error) => {
          console.error(error);
          alert(error);
        }}
      >
        Claim Character
      </Web3Button>

      <Web3Button
        colorMode="dark"
        accentColor="#5204BF"
        contractAddress="0xe52A8d2d1cb213fE8e8F3D4300c3c29D24e74962"
        action={(contract) => {
          readSkill();
        }}
        onSuccess={() => {
          alert("Character Claimed!");
          // router.push(`/stake`);
        }}
        onError={(error) => {
          console.error(error);
          alert(error);
        }}
      >
        Claim Character
      </Web3Button>
    </div>
  );
};

export default Mint;
