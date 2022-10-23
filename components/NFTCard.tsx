import React from "react";

function NFTCard({ nft }: any) {
  return (
    <div className="w-1/2 flex flex-col ">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          {/* <p className="text-gray-600">Id: {nft.tokenId}</p> */}
          {/* <p className="text-gray-600">{nft.contract.address}</p> */}
        </div>

        <div className="flex-grow mt-2">
          {/* <p className="text-gray-600">{nft.description}</p> */}
        </div>
        <div className="mt-2 flex-wrap flex-row">
          {nft.rawMetadata.attributes.map((attr: any) => {
            return (
              <div className=" border-blue-400 border-2 border-solid rounded mb-2 text-center">
                <p className="text-blue-400 uppercase">{attr.trait_type}</p>
                <p className="text-blue-400">{attr.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
