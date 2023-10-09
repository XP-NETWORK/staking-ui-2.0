import Web3 from "web3";
import algorand from "../../assets/images/coin/algo.svg";
import bsc from "../../assets/images/coin/BSC.svg";
import XPNETTOKEN from "./../../ABI/xpNetToken.json";
import STAKETOKEN from "./../../ABI/xpNetStaker.json";
import testnetXPNETContract from "./../../ABI/testnetXPNETContract.json";
import testnetStakeContract from "./../../ABI/testnetStakeContract.json";
import { AbiItem } from "web3-utils";

export interface IEVMStake {
    amount: string;
    correction: string;
    image: string;
    isActive: boolean;
    lockInPeriod: string;
    nftTokenId: string;
    rewardWithdrawn: string;
    stakeWithdrawn: false;
    staker: string;
    startTime: string;
    availableRewards: string;
    isUnlocked: boolean;
}

export interface IActiveSessionSTake {
    txID: string;
    txInfo: any;
    amount: number;
    details: StakeDetails;
}

interface StakeDetails {
    appId: number;
    duration: number;
    multiplier: number;
}

export interface IFetchedStake {
    appId: number;
    id: number;
    lockTime: number;
    owner: string;
    stakingTime: number;
    timeToUnlock: number;
    tokensStaked: number;
    tokensStakedWithBonus: number;
    txId: string;
    nftUri: any;
    displayImage: string;
}
export interface IAlgoRewards {
    appid: number;
    earned: number;
    id: number;
}

export interface INFT {
    CD: string;
    Uri: any;
    address: string;
    appId: number;
    assetId: number;
    isClaimed: boolean;
    stakeId: number;
    timeStamp: number;
    txId: string;
}

export interface INFTURI {
    name: string;
    description: string;
    image: string;
    image_integrity: string;
    properties: IProperties;
}

interface IProperties {
    creator: string;
    created_at: string;
    traits: Traits;
}

interface Traits {
    Back: string;
    Body: string;
    Tattoo: string;
    Shoes: string;
    Pants: string;
    Clothes: string;
    Eyes: string;
    Mouth: string;
    Weapon: string;
    Hair: string;
    Acc: string;
}
//0x6272AF9Bac58eFbBbCddc1218d794920f74DEE82

export const bsc_staking = "0xbC9091bE033b276b7c2244495699491167C20037";
export const bsc_token = "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a";

export const STAKING_LIMIT_ALGO = 50000000;
export const TOTAL_STAKED_BSC = 50000000;
export const XPNET = "XPNET";
export const APY = { 3: 45, 6: 75, 9: 100, 12: 125 };

export const BLOCKCHAINS = [
    { chain: "Algorand", img: algorand },
    { chain: "BSC", img: bsc },
];

export const algodApiKey = "y7NlS5BDAY2TEzVKg58Un8BqN0QMuUMU1SgBxEeD";
// export const algodTestnetUri = "https://node.testnet.algoexplorerapi.io";
export const algodUri = "https://mainnet-algorand.api.purestake.io/ps2";
export const algodPort = 443;
export const assetIdx = 1201260646;

const web3 = new Web3(
    Web3.givenProvider || "https://bsc-dataseed.binance.org/"
);

// ! MAINNET CONTRACTS
export const EVMContract = new web3.eth.Contract(
    XPNETTOKEN as AbiItem[],
    bsc_token
);
export const EVMStakeContract = new web3.eth.Contract(
    STAKETOKEN as AbiItem[],
    bsc_staking
);
// ! //////////
// ? TESTNET CONTRACTS
export const TestnetToken = new web3.eth.Contract(
    testnetXPNETContract as AbiItem[],
    bsc_token
);

export const TestnetStake = new web3.eth.Contract(
    testnetStakeContract as AbiItem[],
    bsc_staking
);

// 3 different contracts - every staking periog has her own contract
export const appAdress3Months = 1201260122;
export const duration3Months = 180;
export const multiplier3Months = 130000000000;

export const appAdress6Months = 1201260242;
export const duration6Months = 360;
export const multiplier6Months = 150000000000;

export const appAdress9Months = 1201260351;
export const duration9Months = 540;
export const multiplier9Months = 170000000000;

export const appAdress12Months = 1201260443;
export const duration12Months = 720;
export const multiplier12Months = 190000000000;

//  ?????????

/**
 * Created main app: 1198375284, address:4ZT7P7C4BQ4JPKFV4YNDUYY4FM4WHSUNCMEWTCY73Y7GYEKIHDNOLVK3QY
Created main app: 1198375362, address:X4FIWIB4NT6FORGQCMZXQ3UI6BZFIG4MWLN474TEEN2KXVEX62BQZIIXHM
Created main app: 1198375478, address:ZB5BEZUPWAESKK6Y3Y77P6PRZ7P7XBBZ5GFRS5LPOFFODDYBKIW6BQDPEI
Created main app: 1198375591, address:3SGZGVDP7PTXNX4JIVKY4K2UF2PQWF5ZEUNBTP54SCH6LPOLXRQRM3ZRDQ
Created sub app: 1198375669, address:6NWOTCAJ32ZB2R4CSIBJ5DYAXUVDHHJVDP6WHILF2O3ESEGGODMTR5IPYI
Created Asset with id: 1198375742 and in tx: SDV53BUDUEB3WHXK4QO4YBZIN44MI3HBMQHE7GO6TXTN7AT76SAA
 * 
 */

// export const appAdress3Months = 970373105;
// export const duration3Months = 7890000;
// export const multiplier3Months = 130000000000;

// export const appAdress6Months = 970373392;
// export const duration6Months = 15780000;
// export const multiplier6Months = 150000000000;

// export const appAdress9Months = 970374012;
// export const duration9Months = 23650000;
// export const multiplier9Months = 170000000000;

// export const appAdress12Months = 970374296;
// export const duration12Months = 31540000;
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
                ? duration12Months //! duration for 12 month
                : _duration === 9
                ? duration9Months //! duration for 9 month
                : _duration === 6
                ? duration6Months //! duration for 6 month
                : duration3Months; //! duration for 3 month
        this.appId =
            _duration === 12
                ? appAdress12Months //! 12 month app id
                : _duration === 9
                ? appAdress9Months //! 9 month app id
                : _duration === 6
                ? appAdress6Months //! 6 month app id
                : appAdress3Months; //! 3 month app id
        this.multiplier =
            _duration === 12
                ? multiplier12Months //! multiplier for 12 month
                : _duration === 9
                ? duration9Months //! multiplier for 9 month
                : _duration === 6
                ? multiplier6Months //! multiplier for 6 month
                : multiplier3Months; //! multiplier for 3 month
    }
}

// export const duration = 1209600;
// export const multiplier = 100000000000;
// export const appAdress = 121878733;
export const minClaimPeriod = 604800;
export const rewardRate = 1929004;
export const communityAddress =
    "JA5BOPYOZB4YDI4X4MCI76XFZO5DCPWLKJKN72YPJPNPPFQPJAMUAPP7MY"; //my add-lost tokens
export const maxLoss = 75000000000;

export const subAppId = BigInt(1201260554);
export const tmode = window.location.search.includes("tmode=true");
export const baseKey = "ZGF2dWd0c3JvdQ==";
