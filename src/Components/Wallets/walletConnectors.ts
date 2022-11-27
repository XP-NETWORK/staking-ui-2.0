import { PeraWalletConnect } from "@perawallet/connect";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import store from "../../store/store";
import algosdk from "algosdk";
import { Connectors } from "web3-react";
import {
    setAccount,
    setConnectedWallet,
    setSigner,
} from "../../store/reducer/homePageSlice";
import Web3 from "web3";
import { getAmountOfEVMTokensStaked } from "../../assets/ts/evmUtils";
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
} from "@web3modal/ethereum";
import { BSC } from "../../assets/ts/Consts";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";

const chains = [BSC];

// const { provider } = configureChains(chains, [
//   walletConnectProvider({ projectId: "<YOUR_PROJECT_ID>" })
// ]);
// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: modalConnectors({ appName: "web3Modal", chains }),
//   provider,
// });

const { InjectedConnector } = Connectors;

let web3 = new Web3(Web3.givenProvider || "https://bsc-dataseed.binance.org/");

const MetaMask = new InjectedConnector({ supportedNetworks: [56] });

export const connectors = { MetaMask };

const peraWallet = new PeraWalletConnect({
    bridge: "https://bridge.walletconnect.org",
});

export const algoConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
});

export const connectPeraWallet = async (testnet: boolean) => {
    // debugger;

    peraWallet.connect().then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", () => {
            console.log("Disconnect");
        });
        store.dispatch(setConnectedWallet("Pera"));
        store.dispatch(setAccount(newAccounts[0]));
        store.dispatch(setSigner(peraWallet));
    });
};
declare global {
    interface Window {
        AlgoSigner: any;
    }
}
export const connectAlgoSigner = async (testnet: boolean) => {
    // debugger;
    if (typeof window.AlgoSigner === "object") {
        try {
            await window.AlgoSigner.connect();
            const algo = await window.AlgoSigner.accounts({
                ledger: testnet ? "TestNet" : "MainNet",
            });
            const address = algo[0].address;
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

export const getMyAlgoConnect = async (testnet: boolean) => {
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

export const connectMetaMask = async () => {
    let accounts: string[];
    let stakes: number | undefined;

    if (typeof window.ethereum !== "undefined") {
        try {
            accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const chainId = await web3.eth.getChainId();
            stakes = await getAmountOfEVMTokensStaked(accounts[0]);
            if (accounts && chainId !== 56) {
                window.ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: "0x38" }],
                });
            }
            return { accounts, stakes };
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};
