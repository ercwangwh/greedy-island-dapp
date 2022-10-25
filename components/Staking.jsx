import React from "react";
import { useContractWrite, usePrepareContractWrite, useContract } from "wagmi";
import { contractAddressMumbai, stakingAbi, knightAbi } from "../constants";

function Staking() {
  const { config } = usePrepareContractWrite({
    address: contractAddressMumbai.staking,
    abi: stakingAbi,
    functionName: "summon",
  });
  const { write } = useContractWrite(config);

  const stakeContract = useContract({
    address: contractAddressMumbai.staking,
    abi: stakingAbi,
  });

  const knightContract = useContract({
    address: contractAddressMumbai.knight,
    abi: knightAbi,
  });

  async function stakeNft() {
    // if (!address) return;

    // const isApproved = await nftDropContract?.isApproved(
    //   address,
    //   stakingContractAddress
    // );
    // If not approved, request approval
    // if (!knightContract.) {
    await knightContract.setApprovalForAll(stakingContractAddress, true);
    //   await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
    // }
    // const stake = await stakeContract.call("stake", 1);
  }

  return (
    <div>
      <div>
        <button
          className="border-blue-400 border-2 border-solid rounded"
          disabled={!write}
          onClick={() => stakeNft()}
        >
          Stake
        </button>
      </div>
    </div>
  );
}

export default Staking;
