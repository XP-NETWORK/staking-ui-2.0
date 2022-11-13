
import algorand from "../../assets/images/coin/algo.svg";
import bsc from "../../assets/images/coin/BSC.svg";

export const STAKING_LIMIT_ALGO = 10000000;
export const TOTAL_STAKED_BSC = 50000000;
export const XPNET = "XPNET";
export const APY = { 3: 45, 6: 75, 9: 100, 12: 125 };


// //erc20 consts - xpnet
// export const XPNET_CONTRACT_ADDRESS = "0x8cf8238abf7b933Bf8BB5Ea2C7E4Be101c11de2A";
// export const XPNET_ASSET_ID = "832988336";
// export const CHAINS_TYPE = {
//   BSC: "BSC",
//   Algorand: "Algorand",
// };
// //end 

export const BLOCKCHAINS = [
  { chain: "Algorand", img: algorand },
  { chain: "BSC", img: bsc },
];

export const algodApiKey =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

export const algodUri = "https://node.testnet.algoexplorerapi.io";
export const algodPort = 443;
export const assetIdx = 121878783;
export const appAdress = 121878733;

// const nonce = Chain.ALGORAND;
// const sendNftAppId = 83148194;
//const indexerUri = "https://algoindexer.testnet.algoexplorerapi.io";

export const urlLocNft = "/src/assets/images/nftRewards/";

export const NFT_SRC = [
  `${urlLocNft}0.jpeg`,
  `${urlLocNft}1.jpeg`,
  `${urlLocNft}2.jpeg`,
  `${urlLocNft}3.jpeg`,
];

// const arr = {
//   alt: "lihi",
//   url: bsc,
// };
