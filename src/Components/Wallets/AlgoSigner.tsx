import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/AlgoSigner.png";

const AlgoSigner = ({ connect }: { connect: Function }) => {
  const handleClick = async () => {
    await connect("AlgoSigner");
  };
  return (
    <button onClick={handleClick} className="connectBtn">
      <img style={{ width: "28px" }} src={icon} alt="" />
      AlgoSigner
    </button>
  );
};

export default HigherALGO(AlgoSigner);
