import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/MyAlgo.svg";

const MyAlgo = ({ connect }: { connect: Function }) => {
    const handleClick = async () => {
        await connect("MyAlgo");
    };
    return (
        <button onClick={handleClick} className="connectBtn">
            <img src={icon} alt="" />
            MyAlgo
        </button>
    );
};

export default HigherALGO(MyAlgo);
