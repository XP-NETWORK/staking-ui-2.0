import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { isUndefined } from "util";
import { BLOCKCHAINS, IAlgoStake } from "../../assets/ts/Consts";

export interface IHomePage {
    blockchain: { chain: string; img: string };
    account: string; //the user
    signer: any;
    balance: number;
    stakeDetails: {
        amount: number;
        stakingPeriod: any;
        isAgree: boolean;
    };
    peraConnection: boolean;
    stakingClient: any;
    connectedWallet: string;
    algoDetails: any;
    evmAccount: string;
    evmStakes: number | undefined;
    evmStakesArray: IAlgoStake[];
    XPNetPrice: number;
    // tokenName: string; //collection name
    // tokenSymbol: string; //token thicker
}

const initialState: IHomePage = {
    blockchain: BLOCKCHAINS[0],
    account: "",
    evmAccount: "",
    signer: {},
    peraConnection: false,
    stakingClient: {},
    stakeDetails: { amount: 0, stakingPeriod: 0, isAgree: false },
    connectedWallet: "",
    algoDetails: {},
    evmStakes: undefined,
    balance: 0,
    evmStakesArray: [],
    XPNetPrice: 0,
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setXPNetPrice(state: any, action: any) {
            state.XPNetPrice = action.payload;
        },
        setEVMStakesArray(state: any, action: any) {
            state.evmStakesArray = action.payload;
        },
        setBalance(state: any, action: any) {
            state.balance = action.payload;
        },
        setEvmStakes(state: any, action: any) {
            state.evmStakes = action.payload;
        },
        setEvmAccount(state: any, action: any) {
            state.evmAccount = action.payload;
        },
        setAlgoDetails(state: any, action: any) {
            state.algoDetails = action.payload;
        },
        setConnectedWallet(state: any, action: any) {
            state.connectedWallet = action.payload;
        },
        setAccount(state: any, action: any) {
            state.account = action.payload;
        },
        setSigner(state: any, action: any) {
            state.signer = action.payload;
        },
        setPeraConnection(state: any, action: any) {
            state.peraConnection = action.payload;
        },
        setClient(state: any, action: any) {
            state.stakingClient = action.payload;
        },
        accountState(state: any, action: any) {
            state.account = action.payload;
        },
        setStakeDetails(state: any, action: any) {
            state.stakeDetails = action.payload;
        },
        setBlockchain(state: any, action: any) {
            state.blockchain = action.payload;
        },

        // setToken(state: { tokenName: string }, action: PayloadAction<string>) {
        //   state.tokenName = action.payload;
        //   // console.log("collection name in redux:", state.tokenName);
        // },

        // seTokenSymbol(
        //   state: { tokenSymbol: string },
        //   action: PayloadAction<string>
        // ) {
        //   state.tokenSymbol = action.payload;
        //   // console.log("token thicker in redux:", state.tokenSymbol);
        // },
    },

    extraReducers: {},
});

export const {
    setXPNetPrice,
    setEVMStakesArray,
    setBalance,
    setEvmStakes,
    setEvmAccount,
    setBlockchain,
    setPeraConnection,
    setAccount,
    setSigner,
    setClient,
    setStakeDetails,
    setConnectedWallet,
    setAlgoDetails,
} = homePageSlice.actions;

export default homePageSlice;
