import { PeraWalletConnect } from "@perawallet/connect";

export const peraWallet = new PeraWalletConnect();

export const connectPeraWallet = async () => {
    peraWallet
        .connect()
        .then((accounts) => {
            // Setup the disconnect event listener
            peraWallet.connector?.on("disconnect", handleDisconnectPeraWallet);
            console.log(accounts[0]);
            return accounts[0];
        })
        .catch((error) => {
            // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
            // For the async/await syntax you MUST use try/catch
            if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
                // log the necessary errors
            }
        });
};

export const handleDisconnectPeraWallet = () => {
    peraWallet.disconnect();
    //  TODO Something after disconnect
};
