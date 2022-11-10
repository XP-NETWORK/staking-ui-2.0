import { PeraWalletConnect } from "@perawallet/connect";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client";

const peraWallet = new PeraWalletConnect({
    bridge: "https://bridge.walletconnect.org",
});

export const algoConnector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
});

export const connectPeraWallet = async () => {
    debugger;
    peraWallet.connect().then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", () => {
            console.log("Disconnect");
        });

        console.log(newAccounts[0]);
    });

    // let session;
    // if (!algoConnector.connected) {
    //     await algoConnector.createSession();
    // }
    // if (algoConnector.pending) return QRCodeModal.open(algoConnector.uri, null);
    // console.log(session);
};
