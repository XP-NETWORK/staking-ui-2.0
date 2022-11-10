import React, { FC } from "react";
// import { connectPeraWallet } from "./walletConnectors";

const HigherALGO = (OriginalComponent: React.FC<any>) => {
    const handleWalletConnection = async (wallet: string) => {
        debugger;
        switch (wallet) {
            case "MyAlgo":
                break;
            case "AlgoSigner":
                break;
            case "Pera":
                // connectPeraWallet();
                break;
            default:
                break;
        }
    };
    const getStyles = () => {};
    return () => {
        return (
            <OriginalComponent
                connect={handleWalletConnection}
                styles={getStyles}
            />
        );
    };
};
export { HigherALGO };
