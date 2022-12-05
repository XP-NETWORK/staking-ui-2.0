import React, { FC } from "react";
import wallet from "../../assets/images/wallet.svg";
import close from "../../assets/images/close-icon.svg";
import "./connect.scss";
import { useLocation, useNavigate } from "react-router";
import Pera from "../Wallets/Pera";
import MyAlgo from "../Wallets/MyAlgo";
import AlgoSigner from "../Wallets/AlgoSigner";
import MetaMask from "../Wallets/MetaMask";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import WalletConnect from "../Wallets/WalletConnect";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig } from "wagmi";
import { ethereumClient, wagmiClient, wcId } from "../Wallets/walletConnectors";

interface Props {}

export const Connect: FC<Props> = ({}) => {
    const navigate = useNavigate();
    const blockchain = useSelector(
        (state: ReduxState) => state.homePage.blockchain
    ).chain;

    return (
        <>
            <div className="connectWraper">
                <div className="connectHeader">
                    <label>
                        <img src={wallet} />
                        Connect a wallet
                    </label>
                    <img src={close} onClick={() => navigate("/")} />
                </div>
                <div className="connectBtns">
                    {blockchain === "BSC" ? (
                        <>
                            <WagmiConfig client={wagmiClient}>
                                <MetaMask />
                                <WalletConnect />
                            </WagmiConfig>
                        </>
                    ) : (
                        <>
                            <Pera />
                            <MyAlgo />
                            <AlgoSigner />
                        </>
                    )}
                </div>
                <p>
                    By connecting a wallet, you agree to XPNET’s{" "}
                    <span>Terms of Service</span> and acknowledge that you have
                    read and understand the{" "}
                    <span>XPNET protocol disclaimer</span>.
                </p>
            </div>
        </>
    );
};
