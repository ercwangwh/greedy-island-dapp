import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Header from "../components/Header";
import { useState } from "react";

const Character: NextPage = () => {
  const router = useRouter();
  const address = useAddress();
  //   const [info, setInfo] = useState<any>([]);

  const characterContractAddress = "0x39a1E12B3F71E0607c17057a8B0e2D1C2A4D62c6";
  //   const skillsContractAddress = "0xc8b198A641F0fa6A32600E49129d9F713249De24";
  const { contract: characterContract } = useContract(characterContractAddress);
  //   const { contract: skillsContract } = useContract(skillsContractAddress);

  const {
    data: tokenIdData,
    isError: tokenIDisError,
    // isLoading: tokenIDisLoading,
    isSuccess: tokenIDisSuccess,
  } = useContractRead(characterContract, "address_tokenId", address);
  //   const level_value = useContractRead(contract,)contract?.call("address_tokenId", address);

  console.log(tokenIDisError, tokenIDisSuccess, address);
  const {
    data: nameData,
    isError: nameIsError,
    // isLoading: tokenIDisLoading,
    isSuccess: nameIsSuccess,
  } = useContractRead(characterContract, "name", tokenIdData);

  //   const {
  //     data: skillIdData,
  //     isError: skillError,
  //     isSuccess: skillisSuccess,
  //   } = useContractRead(skillsContract, "skill_by_id", [0]);

  return (
    <div className={styles.container}>
      <Header></Header>
      <h1 className={styles.h1}>Mint Character</h1>

      <p className={styles.explain}>
        Here is <b>Character Drop</b> contract to allow users to mint one
        Character NFTs.
      </p>
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <Web3Button
        colorMode="dark"
        accentColor="#5204BF"
        contractAddress={characterContractAddress}
        action={(contract) => contract.call("summon")}
        onSuccess={() => {
          alert("Character Claimed!");
          //   router.push(`/stake`);
        }}
        onError={(error) => {
          console.error(error);
          alert(error);
        }}
      >
        Claim Character
      </Web3Button>

      {/* <div>ID: {tokenIDisSuccess ? String(tokenIdData) : 1}</div> */}
      <div>{tokenIDisSuccess ? <p>ID: {String(tokenIdData)}</p> : ""}</div>
      {/* <div>Name: {nameIsSuccess ? nameData : 1}</div> */}
      <div>{nameIsSuccess ? <p>Name: {nameData}</p> : ""}</div>
      {/* <div>Skills: {skillisSuccess ? String(skillIdData) : 1}</div> */}
    </div>
  );
};

export default Character;
