import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";

type Props = {
  skillId: number;
  skillMultiple: String;
};

function CharacterSkill({ skillId, skillMultiple }: Props) {
  const address = useAddress();
  const [levelCoin, setLevelCoin] = useState<BigNumber>();

  const characterContractAddress = "0x39a1E12B3F71E0607c17057a8B0e2D1C2A4D62c6";
  const { contract: characterContract } = useContract(characterContractAddress);
  const {
    data: levelData,
    isError: levelIsError,
    isLoading: levelIsLoading,
    isSuccess: levelIsSuccess,
    refetch: leveRefetch,
  } = useContractRead(characterContract, "hunter_skill", address);

  useEffect(() => {
    if (levelIsSuccess) {
      characterContract
        ?.call("coin_required", levelData[skillId])
        .then((value) => setLevelCoin(value));

      console.log(levelCoin);
    }
  }, [levelIsSuccess]);

  const {
    data: tokenIdData,
    isError: tokenIDisError,
    isSuccess: tokenIDisSuccess,
  } = useContractRead(characterContract, "address_tokenId", address);

  if (levelIsError && tokenIDisError) {
    return <p>fetching error</p>;
  }

  if (levelIsLoading) {
    return <p>updating</p>;
  }

  return (
    <div>
      {levelIsSuccess ? (
        <>
          <p>
            Multiple:{" "}
            {Number(skillMultiple) * Number(levelData[String(skillId)])} X
          </p>
          <p>Level: {String(levelData[String(skillId)])}</p>
          <p>
            Upgrade Required:
            {levelCoin
              ? ethers.utils.formatUnits(levelCoin, 18)
              : "fetching"}{" "}
            Coin
          </p>
          <button
            className={`${styles.mainButton} ${styles.spacerBottom}`}
            onClick={() => {
              characterContract
                ?.call("skill_up", tokenIdData, skillId)
                .then(() => leveRefetch());
            }}
          >
            Upgrade
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default CharacterSkill;
