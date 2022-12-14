import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
    setConnectedWallet,
    setPeraConnection,
} from "../../store/reducer/homePageSlice";
import {
    connectAlgoSigner,
    connectPeraWallet,
    getMyAlgoConnect,
} from "./walletConnectors";

export const HigherALGO = (OriginalComponent: React.FC<any>) => {
    return function CB() {
        const getStyles = () => {};
        const dispatch = useDispatch();
        const handleWalletConnection = async (wallet: string) => {
            // debugger;
            switch (wallet) {
                case "MyAlgo":
                    let accountMyAlgo = await getMyAlgoConnect(false); //!! testnet:true
                    dispatch(setConnectedWallet("MyAlgo"));
                    return accountMyAlgo;
                case "AlgoSigner":
                    let algosignerAccount = await connectAlgoSigner(false); //!! testnet:true
                    dispatch(setConnectedWallet("AlgoSigner"));
                    return algosignerAccount;
                case "Pera":
                    let peraAccount = await connectPeraWallet(false); //!! testnet:true
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
};
