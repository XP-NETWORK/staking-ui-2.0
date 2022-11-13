import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/AlgoSigner.png";
import { createClient } from "../../assets/ts/algoUtils";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";

const AlgoSigner = ({ connect }: { connect: Function }) => {
  const { signer, account } = useSelector(
    (state: ReduxState) => state.homePage
  );
  const handleClick = async () => {
    await connect("AlgoSigner");
    createClient(signer, account);
  };
  return (
    <button onClick={handleClick} className="connectBtn">
      <img style={{ width: "28px" }} src={icon} alt="" />
      AlgoSigner
    </button>
  );
};

export default HigherALGO(AlgoSigner);
