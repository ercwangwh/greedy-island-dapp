import React from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { characterAbi, contractAddresses } from "../constants";
function PlayGround() {
  const { config } = usePrepareContractWrite({
    address: contractAddresses[31337].character,
    abi: [
      {
        type: "function",
        name: "summon",
        // constant: false,
        // payable: false,
        stateMutability: "nonpayable",
        // gas: 29000000,
        inputs: [],
        outputs: [],
      },
    ],
    functionName: "summon",
  });

  const { data, isError, isLoading } = useContractRead({
    address: contractAddresses[31337].character,
    abi: characterAbi,
    functionName: "hunter_info",
    args: [0],
  });

  console.log(data);

  const { write } = useContractWrite(config);

  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Mint
      </button>
      Main
    </div>
  );
}

export default PlayGround;
