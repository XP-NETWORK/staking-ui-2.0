// import { PeraWalletConnect } from "@perawallet/connect";

// export const peraWallet = new PeraWalletConnect();

// export const connectPeraWallet = async () => {
//     peraWallet
//         .connect()
//         .then((accounts) => {
//             // Setup the disconnect event listener
//             peraWallet.connector?.on("disconnect", handleDisconnectPeraWallet);
//             console.log(accounts[0]);
//             return accounts[0];
//         })
//         .catch((error) => {
//             // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
//             // For the async/await syntax you MUST use try/catch
//             if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
//                 // log the necessary errors
//             }
//         });
// };

// export const handleDisconnectPeraWallet = () => {
//     peraWallet.disconnect();
//     //  TODO Something after disconnect
// };

declare global {
  interface Window {
    AlgoSigner: any;
  }
}
export const connectAlgoSigner = async (testnet: boolean) => {
  if (typeof window.AlgoSigner !== undefined) {
    try {
      await window.AlgoSigner.connect();
      const algo = await window.AlgoSigner.accounts({
        ledger: testnet ? "TestNet" : "MainNet",
      });
      const { address } = algo[0];
      return address;
      // store.dispatch(setAlgoSigner(true));
      // store.dispatch(setAlgorandAccount(address));
      // const signer = {
      //   address: address,
      //   AlgoSigner: window.AlgoSigner,
      //   ledger: testnet ? "TestNet" : "MainNet",
      // };
      // store.dispatch(setSigner(signer));
      // return true;
    } catch (e) {
      console.error(e);
      return JSON.stringify(e, null, 2);
    }
  } else {
    console.log("Algo Signer not installed.");
    return false;
  }
};

//   const getMyAlgoSigner = async (base, algorandAccount) => {
//     const factory = await getFactory();
//     const inner = await factory.inner(15);
//     const signer = inner.myAlgoSigner(base, algorandAccount);
//     return signer;
//   };
