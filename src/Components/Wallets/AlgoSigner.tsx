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
import { appAdress3Months, assetIdx } from "../../assets/ts/Consts";
import { useNavigate, useParams } from "react-router";

const AlgoSigner = ({ connect }: { connect: Function }) => {
    let { to } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { connectedWallet } = useSelector(
        (state: ReduxState) => state.homePage
    );
    const handleClick = async () => {
        let account = await connect("AlgoSigner");
        dispatch(setAccount(account.address));
        dispatch(setSigner(account.signer));
        console.log("algosigner", { account });

        let client = await createClient(
            account.signer,
            account.address,
            appAdress3Months
        );
        dispatch(setClient(client));
        to === "stake" ? navigate("/stake") : navigate("/rewards");

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

        const axfer: any = algosdk.makeAssetTransferTxnWithSuggestedParams(
            account.address,
            algosdk.getApplicationAddress(121878733),
            undefined,
            undefined,
            1,
            undefined,
            assetIdx as any,
            await algod.getTransactionParams().do()
        );
        console.log(axfer);

        // let alex = await client.stake({ axfer: axfer, lockTime_: 1209600 });
        // console.log(alex);

        // let alex1 = await client.getEarned({ address: account.address });
        // console.log({alex1});

        const assetInfo = await client.client
            .accountAssetInformation(client.sender, assetIdx)
            .do();
        const balance = assetInfo["asset-holding"]["amount"];
        console.log(balance);

        // let alex2 = await client.get_balance_addr({ appForeignAssets: [Number(assetIdx)] });
        // console.log({ alex2 });

        // console.log("Account state", (await client.getAccountState()).sn); //total staked
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
