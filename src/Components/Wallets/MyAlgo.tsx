import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/MyAlgo.svg";

interface Props {}

const MyAlgo = () => {
    return (
        <button>
            <img src={icon} alt="" />
            MyAlgo
        </button>
    );
};

export default HigherALGO(MyAlgo);
