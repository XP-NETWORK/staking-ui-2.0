import React, { FC, useEffect } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/Pera.svg";
import { handleDisconnectPeraWallet, peraWallet } from "./walletConnectors";

interface Props {}

const Pera = ({
    styles,
    connect,
}: {
    styles: () => Object;
    connect: Function;
}) => {
    useEffect(() => {
        peraWallet
            .reconnectSession()
            .then((accounts) => {
                //   peraWallet.connector.on ("disconnect", handleDisconnectPeraWallet);

                if (accounts.length) {
                }
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <button style={styles()} onClick={() => connect("Pera")}>
            <img src={icon} alt="" />
            Pera
        </button>
    );
};

export default HigherALGO(Pera);
