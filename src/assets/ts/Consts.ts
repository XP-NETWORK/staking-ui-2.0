import algorand from "../../assets/images/coin/algo.svg";
import bsc from "../../assets/images/coin/BSC.svg";

export const STAKING_LIMIT_ALGO = 10000000;
export const TOTAL_STAKED_BSC = 50000000;
export const XPNET = "XPNET";
export const APY = { 3: 45, 6: 75, 9: 100, 12: 125 };

export const BLOCKCHAINS = [
  { chain: "Algorand", img: algorand },
  { chain: "BSC", img: bsc },
];

export const algodApiKey =
  "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
export const algodUri = "https://node.testnet.algoexplorerapi.io/";
export const algodPort = 443;
export const assetIdx = 121878783;

//3 different contracts - every staking periog has her own contract
export const appAdress3Months = 122908817;
export const duration3Months = 7890000;
export const multiplier3Months = 130000000000;

export const appAdress6Months = 122909036;
export const duration6Months = 15780000;
export const multiplier6Months = 150000000000;

export const appAdress9Months = 122915072;
export const duration9Months = 23650000;
export const multiplier9Months = 170000000000;

export const appAdress12Months = 122909229;
export const duration12Months = 31536000;
export const multiplier12Months = 190000000000;
//

// export const duration = 1209600;
// export const multiplier = 100000000000;
// export const appAdress = 121878733;
export const minClaimPeriod = 604800;
export const rewardRate = 1929004;
export const communityAddress =
  "G3V2A7GT7RJ3LEK2OTMVYUZT47RZBY4GGNPL4NO6DNBFARGYOJNJTJBJCE"; //my add-lost tokens
export const maxLoss = 75000000000;

// export const urlLocNft = "/src/assets/images/nftRewards/";

// export const NFT_SRC = [
//   `${urlLocNft}0.jpeg`,
//   `${urlLocNft}1.jpeg`,
//   `${urlLocNft}2.jpeg`,
//   `${urlLocNft}3.jpeg`,
// ];

// const arr = {
//   alt: "lihi",
//   url: bsc,
// };
