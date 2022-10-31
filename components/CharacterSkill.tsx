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

  const characterContractAddress = "0x9f01B1954fa2B7Eb423e49332196DB2c3c8DBc2f";
  const tokenContractAddress = "0x0e5535Afa90cBDbce42C454648020B0ceCd2C0F3";

  const { contract: characterContract } = useContract(characterContractAddress);
  const { contract: tokenContract } = useContract(
    tokenContractAddress,
    "token"
  );

  const {
    data: levelData,
    isError: levelIsError,
    isLoading: levelIsLoading,
    isSuccess: levelIsSuccess,
    refetch: leveRefetch,
  } = useContractRead(characterContract, "hunter_skill", address);

  //   console.log(characterContract?.getAddress());
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

  async function upgradeSkill() {
    if (!address || tokenIdData <= 0) return;

    const data = await tokenContract?.allowance(characterContractAddress);
    console.log(data?.value);
    // If not approved, request approval
    if (data?.value.isZero()) {
      await tokenContract?.setAllowance(
        characterContractAddress,
        "999999999999999999999999999999999999999999999999999999999"
      );
    }
    // const stake = await contract?.call("stake", id);
    characterContract
      ?.call("skill_up", tokenIdData, skillId)
      .then(() => leveRefetch());
  }

  return (
    <div>
      {levelIsSuccess ? (
        <>
          <p>
            Multiple:{" "}
            {Number(skillMultiple) * Number(levelData[String(skillId)])} x
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
              upgradeSkill();
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
