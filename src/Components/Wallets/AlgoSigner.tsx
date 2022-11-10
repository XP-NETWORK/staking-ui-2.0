import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/AlgoSigner.png";

interface Props {}

const AlgoSigner = ({ connect }: { connect: Function }) => {
  const handleClick = async () => {
    await connect("AlgoSigner");
  };
  return (
    <button onClick={handleClick}>
      <img style={{ width: "28px" }} src={icon} alt="" />
      AlgoSigner
    </button>
  );
};

export default HigherALGO(AlgoSigner);
