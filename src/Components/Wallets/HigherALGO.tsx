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
                    let accountMyAlgo = await getMyAlgoConnect(true); //!! testnet:true
                    console.log(
                        "🚀 ~ file: HigherALGO.tsx ~ line 24 ~ handleWalletConnection ~ accountMyAlgo",
                        accountMyAlgo
                    );
                    dispatch(setAccount(accountMyAlgo.address));
                    dispatch(setSigner(accountMyAlgo.signer));
                    break;
                case "AlgoSigner":
                    let algosignerAccount: any = await connectAlgoSigner(true);
                    return algosignerAccount;
                case "Pera":
                    await connectPeraWallet(true); //!! testnet:true
                    dispatch(setPeraConnection(true));
                    break;
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
