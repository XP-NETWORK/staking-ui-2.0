import React, { FC } from "react";
import wallet from "../../assets/images/wallet.svg";
import close from "../../assets/images/close-icon.svg";
import myAlgo from "../../assets/images/wallets/myalgo.svg";
import walletConnect from "../../assets/images/wallets/walletconnect.png";

import "./error.scss";
import { useNavigate } from "react-router";

interface Props {}

export const Error: FC<Props> = ({}) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="errorWraper">
                <h4>Oh nooooo</h4>
                <p>Seems you don’t have any XPNET staked.</p>
                <div className="btns">
                    <button className="stakeBtn" onClick={() => navigate("/")}>
                        Stake XPNET
                    </button>
                    <button
                        className="changeWalletBtn"
                        onClick={() => navigate("/")}
                    >
                        Change wallet
                    </button>
                </div>
            </div>
        </>
    );
};
