import React, { FC } from "react";
import { HigherALGO } from "./HigherALGO";
import icon from "../../assets/wallets/AlgoSigner.png";
import { algod, createClient } from "../../assets/ts/algoUtils";
import { useSelector } from "react-redux";
import { ReduxState } from "../../store/store";
import { useDispatch } from "react-redux";
import algosdk from "algosdk";

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
    console.log(client);

    dispatch(setClient(client));
    // await client.initialize({
    //   stakingTokenAddress: account.address,
    //   communityAddress: communityAddress,
    //   minClaimPeriod: BigInt(minClaimPeriod),
    //   rewardRate: BigInt(rewardRate),
    //   assetId: BigInt(assetIdx),
    //   duration: BigInt(duration),
    //   multiplier: BigInt(multiplier),
    //   maxLoss: BigInt(maxLoss),
    // });
    // await client.get_balance_addr();
    // console.log(await client.getAccountState());

    const axfer = await algosdk.makeAssetTransferTxnWithSuggestedParams(
      account.address,
      algosdk.getApplicationAddress(121878733),
      undefined,
      undefined,
      BigInt(10),
      undefined,
      assetIdx as any,
      await algod.getTransactionParams().do()
    );
    let alex = await client.stake(axfer, BigInt(1209600) as any);
    console.log(alex);
  };
  //  let  balanceAfterStaking1 =  creator_app_client.call(
  //     Staking.get_balance_addr, foreign_assets=[asset])

  console.log();

  return (
    <button onClick={handleClick} className="connectBtn">
      <img style={{ width: "28px" }} src={icon} alt="" />
      AlgoSigner
    </button>
  );
};

export default HigherALGO(AlgoSigner);
