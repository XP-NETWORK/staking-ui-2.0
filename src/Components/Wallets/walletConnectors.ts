//@ts-nocheck
import { PeraWalletConnect } from "@perawallet/connect";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import store from "../../store/store";

import { Connectors } from "web3-react";
import {
    setAccount,
    setConnectedWallet,
    setSigner,
    setAlgoSelectWallet,
    setAlgoSelectWalletPromise,
} from "../../store/reducer/homePageSlice";

import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from "@web3modal/ethereum";

import { configureChains, createConfig } from "wagmi";
import * as wagamiChains from "wagmi/chains";

import { getAmountOfEVMTokensStaked } from "../../assets/ts/evmUtils";

import { EVMStakeContract } from "../../assets/ts/Consts";
import { Dispatch } from "react";

export const chains = [wagamiChains.bsc];

export const wcId = "7d3de095725e3d8739a25cfe3d395124"; //"0b0db02a079df1074ba0634f3c97f92e";

const { publicClient, webSocketPublicClient } = configureChains(chains, [
    w3mProvider({ projectId: wcId }),
]);

export const wagmiConfig = createConfig({
    connectors: w3mConnectors({ chains, projectId: wcId }),
    publicClient,
    webSocketPublicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

const { InjectedConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [56] });

export const connectors = { MetaMask };

const peraWallet = new PeraWalletConnect({
    bridge: "https://bridge.walletconnect.org",
});
export const algoConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
});

export const connectPeraWallet = async () => {
    // debugger;

    peraWallet
        .connect()
        .then((newAccounts) => {
            // Setup the disconnect event listener
            peraWallet.connector?.on("disconnect", () => {
                console.log("Disconnect");
            });
            store.dispatch(setConnectedWallet("Pera"));
            store.dispatch(setAccount(newAccounts[0]));
            store.dispatch(setSigner(peraWallet));
        })
        .catch((reason: any) => {
            if (reason.message === "Connect modal is closed by user")
                return false;
        });
};
declare global {
    interface Window {
        AlgoSigner: any;
    }
}
export const connectAlgoSigner = async (
    testnet: boolean,
    dispatch: Dispatch
) => {
    // debugger;
    if (typeof window.AlgoSigner === "object") {
        try {
            await window.AlgoSigner.connect();
            const algo = await window.AlgoSigner.accounts({
                ledger: testnet ? "TestNet" : "MainNet",
            });
            if (!algo.length) return;
            let address: string = algo[0];
            if (algo.length > 1) {
                dispatch(setAlgoSelectWallet(algo));
                address = await new Promise((resolve) => {
                    dispatch(setAlgoSelectWalletPromise(resolve));
                });

                dispatch(setAlgoSelectWalletPromise(undefined));
            }

            const signer = window.AlgoSigner;
            return { address, signer };
        } catch (e) {
            console.error(e);
            return JSON.stringify(e, null, 2);
        }
    } else {
        console.log("Algo Signer not installed.");
        return false;
    }
};

export const getMyAlgoConnect = async () => {
    const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });

    const settings = {
        shouldSelectOneAccount: false,
        openManager: true,
    };

    const accounts = await myAlgoConnect.connect(settings);
    // debugger;
    const signer = myAlgoConnect;
    // console.log("myalgo", { signer, address: accounts[0].address });

    return { signer, address: accounts[0].address };
};

// declare global {
//     interface Window {
//         ethereum: any | undefined;
//     }
// }

export const connectMetaMask = async () => {
    let accounts: string[];

    if (typeof window.ethereum !== "undefined") {
        try {
            accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const stakes = await getAmountOfEVMTokensStaked(
                accounts[0],
                EVMStakeContract
            );

            return { accounts, stakes };
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};
