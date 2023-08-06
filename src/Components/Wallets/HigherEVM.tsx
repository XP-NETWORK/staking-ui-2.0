import React from "react";

import { connectMetaMask } from "./walletConnectors";

export const HigherEVM = (OriginalComponent: React.FC<any>) => {
    return function CB() {
        const getStyles = () => ({});

        const handleWalletConnection = async (wallet: string) => {
            switch (wallet) {
                case "MetaMask": {
                    const response = await connectMetaMask();
                    return response;
                }
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
