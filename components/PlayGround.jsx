import React from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useContractRead,
} from "wagmi";
import { characterAbi, contractAddresses, knightAbi } from "../constants";

import { NftExcludeFilters, Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";
// import { config } from "dotenv";

function PlayGround() {
  const { config } = usePrepareContractWrite({
    address: "0x471fc0316a667116a63d90f1C3f9E80fDd71D089",
    // address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    abi: knightAbi,
    functionName: "safeMint",
  });

  // console.log("knight address:", contractAddresses[31337].knight);

  // const { data, isError, isLoading } = useContractRead({
  //   address: contractAddresses[31337].character,
  //   abi: characterAbi,
  //   functionName: "hunter_info",
  //   args: [0],
  // });

  // console.log(data);

  // const alchemy = new Alchemy();

  // Get how many NFTs an address owns.
  // alchemy.nft
  //   .getNftsForOwner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  //   .then((nfts) => {
  //     console.log(nfts.totalCount);
  //   });

  // alchemy.core
  //   .getTokenBalances("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  //   .then(console.log);
  // Get all the image urls for all the NFTs an address owns.
  // async function main() {
  //   for await (const nft of alchemy.nft.getNftsForOwnerIterator(
  //     "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  //   )) {
  //     // console.log(nft.media);
  //   }
  // }

  // main();

  // Filter out spam NFTs.
  // alchemy.nft
  //   .getNftsForOwner("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", {
  //     excludeFilters: [NftExcludeFilters.SPAM],
  //   })
  //   .then(console.log);

  const { write } = useContractWrite(config);

  async function main() {
    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
      apiKey: "Vi1AooumhLIgAB0ySq2aLOLWeANXFXLK", // Replace with your Alchemy API Key.
      network: Network.MATIC_MUMBAI, // Replace with your network.
    };

    const alchemy = new Alchemy(settings);

    // Print owner's wallet address:
    const ownerAddr = "0x2B6c5D8A55ab57afe74cd551f545DCcf0b1Fb1b1";
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");

    // Print total NFT count returned in the response:
    // const nftsForOwner = await alchemy.nft.getNftsForOwner(
    //   "0x2B6c5D8A55ab57afe74cd551f545DCcf0b1Fb1b1"
    // );
    // console.log("number of NFTs found:", nftsForOwner.totalCount);
    // console.log("...");

    // Print contract address and tokenId for each NFT:
    // for (const nft of nftsForOwner.ownedNfts) {
    //   console.log("===");
    //   console.log("contract address:", nft.contract.address);
    //   console.log("token ID:", nft.tokenId);
    // }
    // console.log("===");

    // Fetch metadata for a particular NFT:
    console.log("fetching metadata for a Crypto Coven NFT...");
    const response = await alchemy.nft.getNftMetadata(
      "0x471fc0316a667116a63d90f1C3f9E80fDd71D089",
      "1"
    );
    // Print some commonly used fields:
    console.log("NFT : ", response);
    console.log("NFT name: ", response.title);
    console.log("token type: ", response.tokenType);
    console.log("tokenUri: ", response.tokenUri.gateway);
    console.log("image url: ", response.rawMetadata.image);
    console.log("time last updated: ", response.timeLastUpdated);
    console.log("===");
  }

  main();
  // Uncomment this line to see the full api response:
  // console.log(response);

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
