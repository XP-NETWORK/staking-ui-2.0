import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { isUndefined } from "util";
import {
    BLOCKCHAINS,
    IActiveSessionSTake,
    IAlgoRewards,
    IEVMStake,
    IFetchedStake,
    INFT,
    INFTURI,
} from "../../assets/ts/Consts";

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
    evmStakesArray: IEVMStake[];
    XPNetPrice: number;
    activeSessionStakes: IActiveSessionSTake[];
    fetchedAlgoStakes: IFetchedStake[];
    algoRewards: IAlgoRewards[];
    nfts: INFT[];
    selectedNFTtxId: string;
    showConnectModal: boolean;
    navigateRoute: string;
    showErrorModal: boolean;
    showLimitModal: boolean;
    showNotifyModal: boolean;
    lastCommit: string;
    evmBalance: number | undefined;
    collections: INFTURI[];
    refreshTheAlgoRewards: boolean;
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
    activeSessionStakes: [],
    fetchedAlgoStakes: [],
    algoRewards: [],
    nfts: [],
    selectedNFTtxId: "",
    showConnectModal: false,
    navigateRoute: "",
    showErrorModal: false,
    showLimitModal: false,
    lastCommit: "",
    evmBalance: undefined,
    collections: [],
    showNotifyModal: false,
    refreshTheAlgoRewards: false,
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setRefreshTheAlgoRewards(state: any) {
            state.refreshTheAlgoRewards = !state.refreshTheAlgoRewards;
        },
        setShowNotifyModal(state: any, action: any) {
            state.showNotifyModal = action.payload;
        },
        setNFTCollection(state: any, action: any) {
            state.collections = action.payload;
        },
        setEvmBalance(state: any, action: any) {
            state.evmBalance = action.payload;
        },
        setLastCommit(state: any, action: any) {
            state.lastCommit = action.payload;
        },
        setLimitModal(state: any, action: any) {
            state.showLimitModal = action.payload;
        },
        setErrorModal(state: any, action: any) {
            state.showErrorModal = action.payload;
        },
        setNavigateRoute(state: any, action: any) {
            state.navigateRoute = action.payload;
        },
        setConnectModalShow(state: any, action: any) {
            state.showConnectModal = action.payload;
        },
        updateClaimedNft(state: any, action: any) {
            const arr = state.nfts;
            const txId = action.payload;
            const updatedArr = arr.map((e: INFT) => {
                if (e.txId === txId) {
                    e.isClaimed = true;
                    return e;
                } else return e;
            });
            state.nfts = updatedArr;
        },
        setSelectedNFT(state: any, action: any) {
            state.selectedNFTtxId = action.payload;
        },
        setNFTSByOwner(state: any, action: any) {
            state.nfts = action.payload;
        },
        updateNFTUriToFetchedStakes(state: any, action: any) {
            // debugger;
            const newArr = state.fetchedAlgoStakes;
            const { uri, txId, displayImage } = action.payload;
            const updated = newArr.map((e: any) => {
                if (e.txId === txId) {
                    e.nftUri = uri;
                    e.displayImage = displayImage;
                }
                return e;
            });
            state.fetchedAlgoStakes = updated;
        },
        setActiveSessionStakes(state: any, action: any) {
            const arr = state.activeSessionStakes;
            arr.push(action.payload);
            state.activeSessionStakes = arr;
        },
        setFetchedAlgoStakes(state: any, action: any) {
            state.fetchedAlgoStakes = action.payload;
        },
        setAlgoRewards(state: any, action: any) {
            state.algoRewards = action.payload;
        },
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
    },

    extraReducers: {},
});

export const {
    setRefreshTheAlgoRewards,
    setShowNotifyModal,
    setNFTCollection,
    setEvmBalance,
    setLastCommit,
    setErrorModal,
    setNavigateRoute,
    setConnectModalShow,
    updateClaimedNft,
    setSelectedNFT,
    setNFTSByOwner,
    updateNFTUriToFetchedStakes,
    setActiveSessionStakes,
    setFetchedAlgoStakes,
    setAlgoRewards,
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
    setLimitModal,
} = homePageSlice.actions;

export default homePageSlice;
