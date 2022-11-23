import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setEvmAccount } from "../../store/reducer/homePageSlice";
import { connectMetaMask } from "./walletConnectors";

export const HigherEVM = (OriginalComponent: React.FC<any>) => {
    return function CB() {
        const navigate = useNavigate();
        const getStyles = () => {};
        const dispatch = useDispatch();
        const handleWalletConnection = async (wallet: string) => {
            switch (wallet) {
                case "MetaMask":
                    const response = await connectMetaMask();

                    return response;
                // if (resp) {
                //     dispatch(setEvmAccount(resp[0]));
                //     navigate("/stake");
                // }
                // break;
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
