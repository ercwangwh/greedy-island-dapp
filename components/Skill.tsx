import React from "react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import {
  useContract,
  useContractRead,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";

type Props = {
  skillId: Number;
};

function Skill({ skillId }: Props) {
  const address = useAddress();

  const skillsContractAddress = "0xc8b198A641F0fa6A32600E49129d9F713249De24";
  const characterContractAddress = "0x2C4ddEBe6DA56b5bff0C42479b66Ba5B918E4E51";
  const coinContractAddress = "0x90b21481A2641eDEE5171033fb5B089c5358B7E0";

  const { contract: skillsContract } = useContract(skillsContractAddress);
  const { contract: characterContract } = useContract(characterContractAddress);
  const { contract: coinContract } = useContract(coinContractAddress);

  const {
    data: skillData,
    isError: skillIsError,
    isSuccess: skillIsSuccess,
  } = useContractRead(skillsContract, "skill_by_id", skillId);

  const {
    data: levelData,
    isError: levelIsError,
    isSuccess: levelIsSuccess,
  } = useContractRead(characterContract, "hunter_skill", address);

  const {
    data: coinRequiredData,
    isError: coinRequiredisError,
    isSuccess: coinRequiredisSuccess,
  } = useContractRead(characterContract, "coin_required", skillId);

  const {
    data: tokenIdData,
    isError: tokenIDisError,
    // isLoading: tokenIDisLoading,
    isSuccess: tokenIDisSuccess,
  } = useContractRead(characterContract, "address_tokenId", address);

  // Load Unstaked NFTs
  //   const { data: ownedNfts } = useOwnedNFTs(characterContract, address);

  //   async function upgradeSkill(id: number) {
  //     const isApproved = await characterContract.call(
  //       address,
  //       characterContractAddress
  //     );
  //   }

  // async function stakeNft(id: string) {
  //   if (!address) return;

  //   const isApproved = await nftDropContract?.isApproved(
  //     address,
  //     stakingContractAddress
  //   );
  //   // If not approved, request approval
  //   if (!isApproved) {
  //     await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
  //   }
  //   const stake = await contract?.call("stake", id);
  // }

  return (
    <div>
      {skillIsError || levelIsError ? (
        <p>fecthing error</p>
      ) : (
        <div>
          {skillIsSuccess && levelIsSuccess ? (
            <div className={styles.skillBox}>
              <p>{String(skillData.name)}</p>
              <p>Multipe: {String(skillData.multiple)} x</p>
              <p>Level: {String(levelData[String(skillId)])}</p>
              <p>
                Upgrade Required:{" "}
                {ethers.utils.formatUnits(coinRequiredData, 18)} Coin
              </p>
              <button
                className={`${styles.mainButton} ${styles.spacerBottom}`}
                onClick={() =>
                  characterContract?.call("skill_up", tokenIdData, skillId)
                }
              >
                Upgrade
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
}

export default Skill;
