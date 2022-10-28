import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Header from "../components/Header";

const Mint: NextPage = () => {
  const router = useRouter();
  const address = useAddress();

  const testNftContractAddress = "0x4bA36BdD0Ff974DecAd7f277E1A0799FeF60E879";
  const { contract, isLoading } = useContract(testNftContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(contract, address);
  // async function readSkill() {
  //   const level_value = await contract?.call("hunter_skill", address);
  //   console.log("level value", level_value);
  //   const multiple_value = await contract?.call(
  //     "hunter_skill_multiple",
  //     address
  //   );
  //   console.log("multiple value", multiple_value);
  // }

  return (
    <div className={styles.container}>
      <Header></Header>
      <h1 className={styles.h1}>Mint An NFT</h1>

      <p className={styles.explain}>
        Here is <b>NFT Drop</b> contract to allow users to mint one of the NFTs
        that for testing.
      </p>
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <Web3Button
        colorMode="dark"
        accentColor="#5204BF"
        contractAddress="0x4bA36BdD0Ff974DecAd7f277E1A0799FeF60E879"
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => {
          alert("NFT Claimed!");
          // router.push(`/stake`);
        }}
        onError={(error) => {
          console.error(error);
          alert(error);
        }}
      >
        Claim An NFT
      </Web3Button>
      <div className={styles.nftBoxGrid}>
        {ownedNfts?.map((nft) => (
          <div className={styles.nftBox} key={nft.metadata.id.toString()}>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              className={styles.nftMedia}
            />
            <h3>{nft.metadata.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mint;
