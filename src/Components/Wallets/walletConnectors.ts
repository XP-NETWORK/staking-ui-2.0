import { PeraWalletConnect } from "@perawallet/connect";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import WalletConnect from "@walletconnect/client";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const peraWallet = new PeraWalletConnect({
  bridge: "https://bridge.walletconnect.org",
});

export const algoConnector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

export const connectPeraWallet = async () => {
  // debugger;
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

export const getMyAlgoConnect = async () => {
  const myAlgoConnect = new MyAlgoConnect({ disableLedgerNano: false });
  const settings = {
    shouldSelectOneAccount: false,
    openManager: true,
  };

  const accounts = await myAlgoConnect.connect(settings);
  console.log("algo connected address", accounts[0].address);
  return accounts[0];
};
