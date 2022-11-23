import Web3 from "web3";
import algorand from "../../assets/images/coin/algo.svg";
import bsc from "../../assets/images/coin/BSC.svg";
import XPNETTOKEN from "./../../ABI/xpNetToken.json";
import STAKETOKEN from "./../../ABI/xpNetStaker.json";
import { AbiItem } from "web3-utils";

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
export const assetIdx = 952937827;

const web3 = new Web3(
    Web3.givenProvider || "https://bsc-dataseed.binance.org/"
);

export const EVMContract = new web3.eth.Contract(
    XPNETTOKEN as AbiItem[],
    process.env.REACT_APP_XPNET_TOKEN
);
export const EVMStakeContract = new web3.eth.Contract(
    STAKETOKEN as AbiItem[],
    process.env.REACT_APP_XPNET_STAKE_TOKEN
);

/*
Created main app: 952936663, address:4ULWEXDHLTS4UNL5N7DGCJI5UEWN64X3BYOGM43WOYZYGMQHORI2AILTDM
Created main app: 952936944, address:IO7COXC7MKG4Z2NICW4USSSYW6KHUGQCVWVWLHI4AQWS3GMIBK5UETKFLY
Created main app: 952937171, address:VMCPH6EOYUF2HEG5K7PH3XKQLI27CNLR2ZIGT5YJY4EXSGPSPU6T3D4NCI
Created main app: 952937415, address:VGJBDFPMD5XCJSA6MAQZVXVZX7L6WYQ5YZNA2YBNXHID2G7POP6TXL4ELI
Created sub app: 952937619, address:4Z7OK2KLMBNDPFFGATFFXLOUZTIZGMN7LWPRW6TOKSZILJMTRJ7AIWCTJM
Created Asset with id: 952937827 and in tx: 7FIZEV37GBSAVIWZH43L7BOEFAHPUXXFPDSRNDPVESQYEFK5YH4A
*/

// 3 different contracts - every staking periog has her own contract
export const appAdress3Months = 952936663;
export const duration3Months = 7890000;
export const multiplier3Months = 130000000000;

// export const appAdress6Months = 952936944;
// export const duration6Months = 15780000;
// export const multiplier6Months = 150000000000;

// export const appAdress9Months = 952937171;
// export const duration9Months = 23650000;
// export const multiplier9Months = 170000000000;

// export const appAdress12Months = 952937415;
// export const duration12Months = 31536000;
// export const multiplier12Months = 190000000000;

interface IAlgoDetails {
    appId: number | undefined;
    duration: number;
    multiplier: number;
}

export class AlgoDetails implements IAlgoDetails {
    appId: number | undefined;
    duration: number;
    multiplier: number;

    constructor(_duration: number) {
        this.duration =
            _duration === 12
                ? 31536000 //! duration for 12 month
                : _duration === 9
                ? 23650000 //! duration for 9 month
                : _duration === 6
                ? 15780000 //! duration for 6 month
                : 7890000; // duration for 3 month
        this.appId =
            _duration === 12
                ? 952937415 //! 12 month app id
                : _duration === 9
                ? 952937171 //! 9 month app id
                : _duration === 6
                ? 952936944 //! 6 month app id
                : 952936663; //! 3 month app id
        this.multiplier =
            _duration === 12
                ? 190000000000 //! multiplier for 12 month
                : _duration === 9
                ? 170000000000 //! multiplier for 9 month
                : _duration === 6
                ? 150000000000 //! multiplier for 6 month
                : 130000000000; //! multiplier for 3 month
    }
}

// export const duration = 1209600;
// export const multiplier = 100000000000;
// export const appAdress = 121878733;
export const minClaimPeriod = 604800;
export const rewardRate = 1929004;
export const communityAddress =
    "CVQFPJPBG4F5XKRHC4LNOTW325NUCFO4SC4K5KYHHVN7YHL3HJWPHODKV4"; //my add-lost tokens
export const maxLoss = 75000000000;

export const subAppId = BigInt(952937619);
