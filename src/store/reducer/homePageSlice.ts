import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IHomePage {
    account: string; //the user
    signer: any;
    stakeDetails: {
        amount: number;
        stakingPeriod: any;
        isAgree: boolean;
    };
    peraConnection: boolean;
    stakingClient: any;
    connectedWallet: string;
    // tokenName: string; //collection name
    // tokenSymbol: string; //token thicker
}

const initialState: IHomePage = {
    account: "",
    signer: {},
    peraConnection: false,
    stakingClient: {},
    stakeDetails: { amount: 0, stakingPeriod: 0, isAgree: false },
    connectedWallet: "",
    // tokenName: "",
    // tokenSymbol: "",
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setConnectedWallet(state: any, action: any) {
            state.connectedWallet = action.payload;
            console.log("CONNECTED WALLET REDUX", state.account);
        },
        setAccount(state: any, action: any) {
            state.account = action.payload;
            console.log("ACCOUNT REDUX", state.account);
        },
        setSigner(state: any, action: any) {
            state.signer = action.payload;
            console.log("SIGNER REDUX", state.signer);
        },
        setPeraConnection(state: any, action: any) {
            state.peraConnection = action.payload;
        },
        setClient(state: any, action: any) {
            state.stakingClient = action.payload;
            console.log("stakingClient REDUX", state.stakingClient);
        },
        accountState(state: any, action: any) {
            state.account = action.payload;
        },
        setStakeDetails(state: any, action: any) {
            state.stakeDetails = action.payload;
            console.log("stake REDUX", state.stakeDetails);
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
    setPeraConnection,
    setAccount,
    setSigner,
    setClient,
    setStakeDetails,
    setConnectedWallet,
} = homePageSlice.actions;

export default homePageSlice;
