import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  setAccount,
  setPeraConnection,
  setSigner,
} from "../../store/reducer/homePageSlice";
import {
  connectAlgoSigner,
  connectPeraWallet,
  getMyAlgoConnect,
} from "./walletConnectors";
// import { setPeraConnection } from "../../store/reducer/homePageSlice";
// import { connectPeraWallet } from "./walletConnectors";

export function HigherALGO(OriginalComponent: React.FC<any>) {
  return function CB() {
    const getStyles = () => {};
    const dispatch = useDispatch();
    const handleWalletConnection = async (wallet: string) => {
      switch (wallet) {
        case "MyAlgo":
          let accountMyAlgo = await getMyAlgoConnect();
          dispatch(setAccount(accountMyAlgo.address));
          break;
        case "AlgoSigner":
          let account: any = await connectAlgoSigner(true);
          dispatch(setAccount(account.address));
          dispatch(setSigner(account.signer));
          console.log(account);
          break;
        case "Pera":
          connectPeraWallet();
          dispatch(setPeraConnection(true));
          break;
        default:
          break;
      }
    };

    return (
      <OriginalComponent connect={handleWalletConnection} styles={getStyles} />
    );
  };
}
