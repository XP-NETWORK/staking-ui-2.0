import { PeraWalletConnect } from "@perawallet/connect";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import store from "../../store/store";
import algosdk from "algosdk";
import { setAccount, setSigner } from "../../store/reducer/homePageSlice";

const peraWallet = new PeraWalletConnect({
    bridge: "https://bridge.walletconnect.org",
});
const algod = algosdk.Algodv2;
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
        store.dispatch(setAccount(newAccounts[0]));
        const signer = {
            address: newAccounts[0],
            signer: peraWallet.connector,
            ledger: testnet ? "testnet" : "mainnet",
        };
        store.dispatch(setSigner(signer));
    });
};
declare global {
    interface Window {
        AlgoSigner: any;
    }
}
export const connectAlgoSigner = async (testnet: boolean) => {
    if (typeof window.AlgoSigner === "object") {
        try {
            await window.AlgoSigner.connect();
            const algo = await window.AlgoSigner.accounts({
                ledger: testnet ? "TestNet" : "MainNet",
            });
            const address = algo[0].address;
            const signer = {
                address: address,
                AlgoSigner: window.AlgoSigner,
                ledger: testnet ? "TestNet" : "MainNet",
            };
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
    const signer = {
        address: accounts[0].address,
        signer: myAlgoConnect,
        ledger: testnet ? "testnet" : "mainnet",
    };
    return { signer, address: accounts[0].address };
};
