import React from "react";
import { useSelector } from "react-redux";
import { optInAsset } from "../../assets/ts/algoUtils";
import { INFT } from "../../assets/ts/Consts";
import { ReduxState } from "../../store/store";
import ClipboardCopy from "../ClipboardCopy/ClipboardCopy";

interface Props {
    index: number;
    nfts: INFT[];
}

export default function AlgoNFTActions({ index, nfts }: Props) {
    const { stakingClient, signer, account } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const handleOptIn = async () => {
        try {
            let params = await stakingClient.client.getTransactionParams().do();
            params.fee = 7_000;
            params.flatFee = true;
            optInAsset(account, nfts[index]?.assetId, params, signer);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="nft-actions">
            <ClipboardCopy index={index} item={nfts[index]} />
            <div onClick={handleOptIn} className="nft-actions-button">
                Opt-In
            </div>
            <div
                className={`nft-actions-button${
                    nfts[index]?.isClaimed ? "--disabled" : ""
                }`}
            >
                Claim
            </div>
        </div>
    );
}
