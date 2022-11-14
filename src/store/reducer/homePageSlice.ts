import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IHomePage {
  account: string; //the user
  signer: any;
  tokenName: string; //collection name
  tokenSymbol: string; //token thicker
  peraConnection: boolean;
}

const initialState: IHomePage = {
  account: "",
  signer: {},
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
      console.log("ACCOUNT REDUX", state.account);
    },
    setSigner(state: any, action: any) {
      state.signer = action.payload;
      console.log("SIGNER REDUX", state.signer);
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
export const { setAccount, setSigner } = homePageSlice.actions;

export default homePageSlice;
