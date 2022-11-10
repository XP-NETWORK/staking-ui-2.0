// import React, { FC, useEffect } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/Pera.svg";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { PeraWalletConnect } from "@perawallet/connect";

interface Props {}

const Pera = ({
    styles,
    connect,
}: {
    styles: () => Object;
    connect: Function;
}) => {
    const peraWallet = new PeraWalletConnect();
    const peraConnection = useSelector(
        (state: ReduxState) => state.homePage.peraConnection
    );

    useEffect(() => {
        console.log("!!");

        peraWallet
            .reconnectSession()
            .then((accounts) => {
                peraWallet?.connector?.on("disconnect", () => {});

                if (accounts.length) {
                    console.log(accounts);
                }
            })
            .catch((e) => console.log(e));
    }, [peraConnection]);

    const handleClick = async () => {
        await connect("Pera");
    };

    return (
        <button style={styles()} onClick={handleClick}>
            <img src={icon} alt="" />
            Pera
        </button>
    );
};

export default HigherALGO(Pera);
