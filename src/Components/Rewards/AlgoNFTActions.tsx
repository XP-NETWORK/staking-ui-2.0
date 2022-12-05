import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    checkIfOpIn,
    optInAsset,
    transferOptedInAsset,
} from "../../assets/ts/algoUtils";
import { INFT } from "../../assets/ts/Consts";
import { updateClaimedNft } from "../../store/reducer/homePageSlice";
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

    const dispatch = useDispatch();
    const [isOptIn, setIsOptIn] = useState(false);
    const [optInBtnDisabled, setOptInDisabled] = useState(false);
    const [claimed, setClaimed] = useState(false);

    const [claimBtnDisabled, setClaimDisabled] = useState(false);

    const handleOptIn = async () => {
        setOptInDisabled(true);
        try {
            const txId = await optInAsset(
                account,
                nfts[index]?.assetId,
                signer,
                stakingClient
            );
            if (txId) setIsOptIn(true);
            setOptInDisabled(false);
        } catch (error) {
            console.log(error);
            setOptInDisabled(false);
        }
    };

    const handleClaim = async () => {
        setClaimDisabled(true);
        const res = await transferOptedInAsset(nfts[index]?.assetId, account);
        if (res) {
            dispatch(updateClaimedNft(nfts[index]?.txId));
            setClaimDisabled(false);
        } else setClaimDisabled(false);
    };

    const isAssetOptIn = async () => {
        const res = await checkIfOpIn(nfts[index]?.assetId, account);
        if (res) setIsOptIn(true);
        else setIsOptIn(false);
    };
    isAssetOptIn();

    const optInStyle: React.CSSProperties = {
        pointerEvents: optInBtnDisabled ? "none" : "auto",
        opacity: optInBtnDisabled ? "0.6" : "1",
    };
    const claimStyle: React.CSSProperties = {
        pointerEvents: claimBtnDisabled ? "none" : "auto",
        opacity: claimBtnDisabled ? "0.6" : "1",
    };

    useEffect(() => {}, [index, nfts]);

    return (
        <div className="nft-actions">
            <ClipboardCopy index={index} item={nfts[index]} />
            <div
                style={optInStyle}
                onClick={handleOptIn}
                className={`nft-actions-button${isOptIn ? "--disabled" : ""}`}
            >
                Opt-In
            </div>
            <div
                style={claimStyle}
                onClick={handleClaim}
                className={
                    isOptIn
                        ? `nft-actions-button${
                              nfts[index]?.isClaimed ? "--disabled" : ""
                          }`
                        : "nft-actions-button--unoptined"
                }
            >
                Claim
            </div>
        </div>
    );
}
