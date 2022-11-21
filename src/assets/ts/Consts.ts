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

export const algodApiKey = process.env.REACT_APP_API_TOKEN;
// export const algodTestnetUri = "https://node.testnet.algoexplorerapi.io";
export const algodUri = "https://algorand-node.xp.network/";
export const algodPort = 443;
export const assetIdx = 951878987;

/*
Created main app: 951877967, address:IMUZBBKTRRRGT2BBEV5JOV43N4BHRIA57DDPWFRG6IRDGT7AGKY4OJRTYI
Created main app: 951878171, address:FP6YHCVWL4GPVO3KAI7734OEE5VRUKI52YHMQEO3DBIIV6WKRT7UPNSCZI
Created main app: 951878324, address:P36SQA2CQMRHBJC2LZF6SZZ3FUSMYH3DVUARZZXGD5QCPXPUEEAHDHE4BU
Created main app: 951878521, address:ZHRFAHXV7F6N2ON2LQFTK2UEW677KHIQMUREIMYKO4OG3T6KY2V2LRUWCM
Created sub app: 951878766, address:AKBUKRUYOUY3F6C4WPFZQZ4NKEC4ICT6ZCE6S3KHU4D3W5GFHTT53MQ6MI
Created Asset with id: 951878987 and in tx: YSGW7E5PNUPGGJ635LSIFJPDGYG3QOJUISY6JBUCTEXGEYDTXKXA
*/

//3 different contracts - every staking periog has her own contract
export const appAdress3Months = 951877967;
export const duration3Months = 7890000;
export const multiplier3Months = 130000000000;

export const appAdress6Months = 951878171;
export const duration6Months = 15780000;
export const multiplier6Months = 150000000000;

export const appAdress9Months = 951878324;
export const duration9Months = 23650000;
export const multiplier9Months = 170000000000;

export const appAdress12Months = 951878521;
export const duration12Months = 31536000;
export const multiplier12Months = 190000000000;
//

// export const duration = 1209600;
// export const multiplier = 100000000000;
// export const appAdress = 121878733;
export const minClaimPeriod = 604800;
export const rewardRate = 1929004;
export const communityAddress =
    "CVQFPJPBG4F5XKRHC4LNOTW325NUCFO4SC4K5KYHHVN7YHL3HJWPHODKV4"; //my add-lost tokens
export const maxLoss = 75000000000;

export const subAppId = BigInt(951878766);

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
