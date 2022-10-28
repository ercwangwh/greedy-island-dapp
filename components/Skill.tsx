import React from "react";
import styles from "../styles/Home.module.css";
import { BigNumber } from "ethers";

import {
  useContract,
  useContractRead,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import CharacterSkill from "./CharacterSkill";

type Props = {
  skillId: number;
};

function Skill({ skillId }: Props) {
  const address = useAddress();

  const skillsContractAddress = "0xc8b198A641F0fa6A32600E49129d9F713249De24";
  // const characterContractAddress = "0x39a1E12B3F71E0607c17057a8B0e2D1C2A4D62c6";
  // const coinContractAddress = "0x90b21481A2641eDEE5171033fb5B089c5358B7E0";

  const { contract: skillsContract } = useContract(skillsContractAddress);
  // const { contract: characterContract } = useContract(characterContractAddress);
  // const { contract: coinContract } = useContract(coinContractAddress);

  const {
    data: skillData,
    isError: skillIsError,
    isSuccess: skillIsSuccess,
  } = useContractRead(skillsContract, "skill_by_id", skillId);

  // const {
  //   data: levelData,
  //   isError: levelIsError,
  //   isSuccess: levelIsSuccess,
  // } = useContractRead(characterContract, "hunter_skill", address);

  // const {
  //   data: coinRequiredData,
  //   isError: coinRequiredisError,
  //   isSuccess: coinRequiredisSuccess,
  // } = useContractRead(characterContract, "coin_required", skillId);

  // console.log(coinRequiredData);
  // const {
  //   data: tokenIdData,
  //   isError: tokenIDisError,
  //   // isLoading: tokenIDisLoading,
  //   isSuccess: tokenIDisSuccess,
  // } = useContractRead(characterContract, "address_tokenId", address);

  return (
    <div>
      {skillIsError ? (
        <p>fecthing error</p>
      ) : (
        <div>
          {skillIsSuccess ? (
            <div className={styles.skillBox}>
              <p>{String(skillData.name)}</p>
              {/* <p>Multipe: {BigNumber(skillData.multiple)} x</p> */}
              <CharacterSkill
                skillId={skillId}
                skillMultiple={String(skillData.multiple)}
              ></CharacterSkill>
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
