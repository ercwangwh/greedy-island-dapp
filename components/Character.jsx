import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { contractAddressMumbai, characterAbi } from "../constants";

function Character() {
  const { config } = usePrepareContractWrite({
    address: contractAddressMumbai.character,
    abi: characterAbi,
    functionName: "summon",
  });
  const { write } = useContractWrite(config);
  return (
    <div>
      <button
        className="border-blue-400 border-2 border-solid rounded"
        disabled={!write}
        onClick={() => write?.()}
      >
        Mint
      </button>
    </div>
  );
}

export default Character;
