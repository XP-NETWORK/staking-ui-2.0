import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/Pera.svg";

interface Props {}

const Pera = () => {
    return (
        <button>
            <img src={icon} alt="" />
            Pera
        </button>
    );
};

export default HigherALGO(Pera);
