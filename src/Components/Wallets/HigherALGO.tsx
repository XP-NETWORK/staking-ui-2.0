import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { setAccount, setPeraConnection } from "../../store/reducer/homePageSlice";
import { connectAlgoSigner, connectPeraWallet } from "./walletConnectors";
// import { setPeraConnection } from "../../store/reducer/homePageSlice";
// import { connectPeraWallet } from "./walletConnectors";

export function HigherALGO(OriginalComponent: React.FC<any>) {
  return function CB() {
    const getStyles = () => {};
    const dispatch = useDispatch();
    const handleWalletConnection = async (wallet: string) => {
      switch (wallet) {
        case "MyAlgo":
          break;
        case "AlgoSigner":
          let account = await connectAlgoSigner(false);
          dispatch(setAccount(account));
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
