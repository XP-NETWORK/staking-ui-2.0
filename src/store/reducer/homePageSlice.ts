import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IHomePage {
    account: string; //the user
    tokenName: string; //collection name
    tokenSymbol: string; //token thicker
    peraConnection: boolean;
}

const initialState: IHomePage = {
    account: "",
    tokenName: "",
    tokenSymbol: "",
    peraConnection: false,
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setAccount(state: any, action: any) {
            state.account = action.payload;
            console.log(state.account);
          },
        setPeraConnection(state: any, action: any) {
            state.peraConnection = action.payload;
        },
        accountState(state: any, action: any) {
            state.account = action.payload;
        },
        setToken(state: { tokenName: string }, action: PayloadAction<string>) {
            state.tokenName = action.payload;
            // console.log("collection name in redux:", state.tokenName);
        },
        seTokenSymbol(
            state: { tokenSymbol: string },
            action: PayloadAction<string>
        ) {
            state.tokenSymbol = action.payload;
            // console.log("token thicker in redux:", state.tokenSymbol);
        },
    },

    extraReducers: {},
});

export const { setPeraConnection } = homePageSlice.actions;
export const { setAccount } = homePageSlice.actions;

export default homePageSlice;
