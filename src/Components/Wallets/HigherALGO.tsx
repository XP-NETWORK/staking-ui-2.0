import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
    setAccount,
    setConnectedWallet,
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
                    let accountMyAlgo = await getMyAlgoConnect(true); //!! testnet:true
                    //   dispatch(setAccount(accountMyAlgo.address));
                    //   dispatch(setSigner(accountMyAlgo.signer));
                    dispatch(setConnectedWallet("MyAlgo"));
                    return accountMyAlgo;
                case "AlgoSigner":
                    let algosignerAccount: any = await connectAlgoSigner(true);
                    dispatch(setConnectedWallet("AlgoSigner"));
                    return algosignerAccount;
                case "Pera":
                    let peraAccount: any = await connectPeraWallet(true); //!! testnet:true
                    dispatch(setPeraConnection(true));
                    return peraAccount;
                default:
                    break;
            }
        };

        return (
            <OriginalComponent
                connect={handleWalletConnection}
                styles={getStyles}
            />
        );
    };
}
