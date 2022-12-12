import Web3 from "web3";
import algorand from "../../assets/images/coin/algo.svg";
import bsc from "../../assets/images/coin/BSC.svg";
import XPNETTOKEN from "./../../ABI/xpNetToken.json";
import STAKETOKEN from "./../../ABI/xpNetStaker.json";
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

export const STAKING_LIMIT_ALGO = 50000000;
export const TOTAL_STAKED_BSC = 50000000;
export const XPNET = "XPNET";
export const APY = { 3: 45, 6: 75, 9: 100, 12: 125 };

export const BLOCKCHAINS = [
    { chain: "Algorand", img: algorand },
    { chain: "BSC", img: bsc },
];

export const algodApiKey = process.env.REACT_APP_API_TOKEN;
// export const algodTestnetUri = "https://node.testnet.algoexplorerapi.io";
export const algodUri = "https://mainnet-algorand.api.purestake.io/ps2";
export const algodPort = 443;
export const assetIdx = 970374733;

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

// 3 different contracts - every staking periog has her own contract
export const appAdress3Months = 970373105;
export const duration3Months = 7890000;
export const multiplier3Months = 130000000000;

export const appAdress6Months = 970373392;
export const duration6Months = 15780000;
export const multiplier6Months = 150000000000;

export const appAdress9Months = 970374012;
export const duration9Months = 23650000;
export const multiplier9Months = 170000000000;

export const appAdress12Months = 970374296;
export const duration12Months = 31540000;
export const multiplier12Months = 190000000000;

//  ?????????

// Created main app: 970373105, address:7UBYRWDPBN53HE7IDWNKMFE4HG5SEKEBSXD7BU3MF4O7GSSW6IFVO4T6VE
// Created main app: 970373392, address:KGQW7PTXHDNKWFHFX2USFD2F6Y7L37ZLDOO3NE7I7QSX4DBA4772Z4ZV7E
// Created main app: 970374012, address:B2GRNA252IQ7JQRXLL42AIQN7EAJQ6PRZ33MYSRFTBALMXQ4HARXLUSZLY
// Created main app: 970374296, address:5KZNUPB6IFYP2LVBRCO6LZL76DMXKK2YAOZGQEE53FBTSOMAPUOFRVRVXI
// Created sub app: 970374539, address:G7EXHNCPEUBHNUOKOF5GCL6M4ERDETVRYGMN7VB3VPD2B3DGVBCSLTP46I
// Created Asset with id: 970374733 and in tx: NJDPJJ7CYJGPZDNY6PCAMVS5GX7T4Q2YFG3ET7MLHHYJGPYGBQZQ

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
    "CVQFPJPBG4F5XKRHC4LNOTW325NUCFO4SC4K5KYHHVN7YHL3HJWPHODKV4"; //my add-lost tokens
export const maxLoss = 75000000000;

export const subAppId = BigInt(970374539);
