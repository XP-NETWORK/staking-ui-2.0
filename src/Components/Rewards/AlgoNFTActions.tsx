import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { checkIfOpIn, optInAsset } from "../../assets/ts/algoUtils";
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

    const [isOptIn, setIsOptIn] = useState(false);
    const [optInBtnDisabled, setOptInDisabled] = useState(false);

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

    const isAssetOptIn = async () => {
        const res = await checkIfOpIn(nfts[index]?.assetId, account);
        if (res) setIsOptIn(true);
        else setIsOptIn(false);
    };
    isAssetOptIn();

    useEffect(() => {}, [isOptIn]);

    const style: React.CSSProperties = {
        pointerEvents: optInBtnDisabled ? "none" : "auto",
        opacity: optInBtnDisabled ? "0.6" : "1",
    };

    return (
        <div className="nft-actions">
            <ClipboardCopy index={index} item={nfts[index]} />
            <div
                style={style}
                onClick={handleOptIn}
                className={`nft-actions-button${isOptIn ? "--disabled" : ""}`}
            >
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
