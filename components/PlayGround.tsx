import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useAccount } from "wagmi";
import { contractAddresses, knightAbi } from "../constants";

import { Alchemy, Network } from "alchemy-sdk";
// import { ethers } from "ethers";
import NFTCard from "./NFTCard";

// import { config } from "dotenv";

function PlayGround() {
  const [NFTs, setNFTs] = useState<any>([]);

  const { config } = usePrepareContractWrite({
    address: contractAddresses[80001].knight,
    // address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    abi: knightAbi,
    functionName: "safeMint",
  });

  const { address } = useAccount();

  const { write } = useContractWrite(config);

  async function fetchNFTs() {
    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
      apiKey: process.env.ALCHEMY_MUMBAI_KEY, // Replace with your Alchemy API Key.
      network: Network.MATIC_MUMBAI, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    // Print owner's wallet address:
    const ownerAddr = address;
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");

    const ownOptions = { contractAddresses: [contractAddresses[80001].knight] };
    const ownNft = await alchemy.nft.getNftsForOwner(address, ownOptions);
    setNFTs(ownNft.ownedNfts);
  }

  console.log(NFTs);
  // Uncomment this line to see the full api response:
  // console.log(response);

  return (
    <div className="mr-auto w-96">
      <div className="flex flex-row justify-between">
        <button
          className="border-blue-400 border-2 border-solid rounded"
          disabled={!write}
          onClick={() => write?.()}
        >
          Mint
        </button>

        <button
          className="border-blue-400 border-2 border-solid rounded"
          onClick={() => fetchNFTs()}
        >
          Fetch Nft
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {NFTs.length &&
          NFTs.map((nft: any) => {
            return <NFTCard nft={nft}></NFTCard>;
          })}
      </div>
    </div>
  );
}

export default PlayGround;
