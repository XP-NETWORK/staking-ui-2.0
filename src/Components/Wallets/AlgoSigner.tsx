import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/AlgoSigner.png";
import { createClient } from "../../assets/ts/algoUtils";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  setAccount,
  setClient,
  setSigner,
} from "../../store/reducer/homePageSlice";

const AlgoSigner = ({ connect }: { connect: Function }) => {
  const dispatch = useDispatch();
  // const { signer, account } = useSelector(
  //   (state: ReduxState) => state.homePage
  // );
  const handleClick = async () => {
    let account = await connect("AlgoSigner");
    dispatch(setAccount(account.address));
    dispatch(setSigner(account.signer));
    console.log("algosigner", { account });

    let client = await createClient(account.signer, account.address);
    dispatch(setClient(client));
    client.get_balance_addr(account.account);
  };
  return (
    <button onClick={handleClick} className="connectBtn">
      <img style={{ width: "28px" }} src={icon} alt="" />
      AlgoSigner
    </button>
  );
};

export default HigherALGO(AlgoSigner);
