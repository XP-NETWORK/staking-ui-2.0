import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setEvmAccount } from "../../store/reducer/homePageSlice";
import { connectMetaMask } from "./walletConnectors";

export const HigherEVM = (OriginalComponent: React.FC<any>) => {
    return function CB() {
        const getStyles = () => {};

        const handleWalletConnection = async (wallet: string) => {
            switch (wallet) {
                case "MetaMask":
                    const response = await connectMetaMask();
                    return response;
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
