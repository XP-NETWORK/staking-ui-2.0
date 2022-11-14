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
import {
  assetIdx,
  communityAddress,
  duration,
  maxLoss,
  minClaimPeriod,
  multiplier,
  rewardRate,
} from "../../assets/ts/Consts";

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
    client.initialize({
      stakingTokenAddress: account.address,
      communityAddress: communityAddress,
      minClaimPeriod: BigInt(minClaimPeriod),
      rewardRate: BigInt(rewardRate),
      assetId: BigInt(assetIdx),
      duration: BigInt(duration),
      multiplier: BigInt(multiplier),
      maxLoss: BigInt(maxLoss),
    });
    client.get_balance_addr();
  };
  return (
    <button onClick={handleClick} className="connectBtn">
      <img style={{ width: "28px" }} src={icon} alt="" />
      AlgoSigner
    </button>
  );
};

export default HigherALGO(AlgoSigner);
