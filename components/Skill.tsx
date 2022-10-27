import React from "react";
import styles from "../styles/Home.module.css";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";

type Props = {
  skillId: Number;
};

function Skill({ skillId }: Props) {
  const address = useAddress();

  const skillsContractAddress = "0xc8b198A641F0fa6A32600E49129d9F713249De24";
  const characterContractAddress = "0x08fD4516920dA451CE12944495317C3DA32e9Ba8";

  const { contract: skillsContract } = useContract(skillsContractAddress);
  const { contract: characterContract } = useContract(characterContractAddress);

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

  return (
    <div>
      {skillIsError ? "Fetching Error" : ""}
      {skillIsSuccess ? (
        <div className={styles.skillBox}>
          <p>{String(skillData.name)}</p>
          <p>Multipe: {String(skillData.multiple)} x</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Skill;
