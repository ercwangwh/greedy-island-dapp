import {
  ThirdwebNftMedia,
  useAddress,
  useTokenBalance,
  useOwnedNFTs,
  useContract,
  useBalance,
  useContractRead,
  useWalletConnect,
  useSigner,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import Skill from "../components/Skill";
// import { sign } from "crypto";
// import { useState } from "react";

const Stake: NextPage = () => {
  const nftDropContractAddress = "0xDA498DEf1297428980CE264dFBCaC56fE0EB4389";
  const tokenContractAddress = "0x0e5535Afa90cBDbce42C454648020B0ceCd2C0F3";
  const stakingContractAddress = "0xfF82E1Fc3CE87b4e9Ff167260CF3fC8145c16C00";
  const characterContractAddress = "0x9f01B1954fa2B7Eb423e49332196DB2c3c8DBc2f";
  // Wallet Connection Hooks
  const address = useAddress();
  const signer = useSigner();
  // const connectWithMetamask = useMetamask();
  console.log(signer);
  // Contract Hooks
  const { contract: nftDropContract } = useContract(
    nftDropContractAddress,
    "nft-drop"
  );

  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );

  const { contract, isLoading: stakeIsLoading } = useContract(
    stakingContractAddress
  );
  const { contract: characterContract, isLoading: characterIsLoading } =
    useContract(characterContractAddress);
  const {
    data: characterBalance,
    // isError: tokenIDisError,
    // // isLoading: tokenIDisLoading,
    // isSuccess: tokenIDisSuccess,
  } = useContractRead(characterContract, "balanceOf", address);

  // const charcterBalance = useBalance(characterContractAddress);
  // cosnt {value:BigNumber} = useBalance(characterContractAddress);
  // const { contract: characterContract } = useContract(characterContractAddress);

  // Load Unstaked NFTs
  const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

  // Load Balance of Token
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  ///////////////////////////////////////////////////////////////////////////
  const [stakedNfts, setStakedNfts] = useState<any[]>([]);
  // const [isStaking, setIsStaking] = useState<boolean>(false);
  // const [skills, setSkills] = useState<any[]>([]);
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

  useEffect(() => {
    if (!contract) return;

    async function loadStakedNfts() {
      const stakedTokens = await contract?.call("getStakedTokens", address);

      // For each staked token, fetch it from the sdk
      const stakedNfts = await Promise.all(
        stakedTokens?.map(
          async (stakedToken: { staker: string; tokenId: BigNumber }) => {
            const nft = await nftDropContract?.get(stakedToken.tokenId);
            return nft;
          }
        )
      );

      setStakedNfts(stakedNfts);
      // console.log("setStakedNfts", stakedNfts);
    }

    if (address) {
      loadStakedNfts();
    }
  }, [address, contract, ownedNfts]);

  useEffect(() => {
    if (!contract || !address) return;

    async function loadClaimableRewards() {
      const cr = await contract?.call("availableRewards", address);
      setClaimableRewards(cr);
    }
    // Timer;
    const rewardUpdate = window.setInterval(() => {
      if (characterBalance > 0) loadClaimableRewards();
    }, 1000);
    return () => clearInterval(rewardUpdate);
  }, [address, contract, characterBalance]);

  // console.log(characterBalance > 0);

  ///////////////////////////////////////////////////////////////////////////
  // Write Functions
  ///////////////////////////////////////////////////////////////////////////
  async function stakeNft(id: string) {
    if (!address || characterBalance <= 0) return;

    const isApproved = await nftDropContract?.isApproved(
      address,
      stakingContractAddress
    );
    console.log(isApproved);
    // If not approved, request approval
    if (!isApproved) {
      await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    }
    const stake = await contract?.call("stake", id);
    // setIsStaking(true);
  }

  async function withdraw(id: BigNumber) {
    const withdraw = await contract?.call("withdraw", id);
  }

  async function claimRewards() {
    const claim = await contract?.call("claimRewards");
  }

  if (stakeIsLoading && characterIsLoading) {
    return <div>Loading</div>;
  }

  if (!address || !(characterBalance > 0)) {
    return (
      <div className={styles.container}>
        <h1 className={styles.h1}>
          Please connect your wallet and claim a character
        </h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Stake Your NFTs</h1>

      <hr className={`${styles.divider} ${styles.spacerTop}`} />

      <>
        <h2>Your Tokens</h2>
        <div className={styles.tokenGrid}>
          <div className={styles.tokenItem}>
            <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
            <p className={styles.tokenValue}>
              <b>
                {!claimableRewards
                  ? "Loading..."
                  : ethers.utils.formatUnits(claimableRewards, 18)}
              </b>
              {tokenBalance?.symbol}
            </p>
          </div>
          <div className={styles.tokenItem}>
            <h3 className={styles.tokenLabel}>Current Balance</h3>
            <p className={styles.tokenValue}>
              <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
            </p>
          </div>
        </div>
        <button
          className={`${styles.mainButton} ${styles.spacerTop}`}
          onClick={() => claimRewards()}
        >
          Claim Rewards
        </button>

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        <h2>Your Skills</h2>
        <div className={styles.skillBoxGrid}>
          <Skill skillId={0}></Skill>
          <Skill skillId={1}></Skill>
          <Skill skillId={2}></Skill>
        </div>

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        <h2>Your Staked NFTs</h2>
        <div className={styles.nftBoxGrid}>
          {stakedNfts?.map((nft) => (
            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className={styles.nftMedia}
              />
              <h3>{nft.metadata.name}</h3>
              <button
                className={`${styles.mainButton} ${styles.spacerBottom}`}
                onClick={() => withdraw(nft.metadata.id)}
                // disabled={!isStaking}
              >
                Withdraw
              </button>
            </div>
          ))}
        </div>

        <hr className={`${styles.divider} ${styles.spacerTop}`} />

        <h2>Your Unstaked NFTs</h2>
        <div className={styles.nftBoxGrid}>
          {ownedNfts?.map((nft) => (
            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className={styles.nftMedia}
              />
              <h3>{nft.metadata.name}</h3>
              <button
                className={`${styles.mainButton} ${styles.spacerBottom}`}
                onClick={() => stakeNft(nft.metadata.id)}
              >
                Stake
              </button>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Stake;
