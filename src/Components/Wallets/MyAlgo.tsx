import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/MyAlgo.svg";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { ReduxState } from "../../store/store";
import { useSelector } from "react-redux";
import { createClient } from "../../assets/ts/algoUtils";
import { appAdress3Months } from "../../assets/ts/Consts";
import {
  setAccount,
  setClient,
  setSigner,
} from "../../store/reducer/homePageSlice";

const MyAlgo = ({ connect }: { connect: Function }) => {
  let { to } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { signer, account } = useSelector(
  //     (state: ReduxState) => state.homePage
  //   );

  const handleClick = async () => {
    let account = await connect("MyAlgo");
   //console.log("here", { account });
    dispatch(setAccount(account.address));
    dispatch(setSigner(account.signer));
   // console.log("look here", { account });
    let client = await createClient(
      account.signer,
      account.address,
      appAdress3Months
    );

    dispatch(setClient(client));
    to === "stake" ? navigate("/stake") : navigate("/rewards");
  };
  return (
    <button onClick={handleClick} className="connectBtn">
      <img src={icon} alt="" />
      MyAlgo
    </button>
  );
};

export default HigherALGO(MyAlgo);
