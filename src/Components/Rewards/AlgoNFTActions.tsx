import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { optInAsset, transferOptedInAsset } from "../../assets/ts/algoUtils";
import { INFT } from "../../assets/ts/Consts";
import {
    setShowLoader,
    updateClaimedNft,
    setCancelledTrx,
} from "../../store/reducer/homePageSlice";
import { ReduxState } from "../../store/store";
import ClipboardCopy from "../ClipboardCopy/ClipboardCopy";
import icon from "../../assets/images/checked.svg";

interface Props {
    index: number;
    nfts: INFT[];
}

export default function AlgoNFTActions({ index, nfts }: Props) {
    const { stakingClient, signer, account, connectedWallet } = useSelector(
        (state: ReduxState) => state.homePage
    );

    const dispatch = useDispatch();

    const [claimBtnDisabled, setClaimDisabled] = useState(
        !nfts.length ? true : false
    );

    const handleClaim = async () => {
        // debugger;
        let txId: string;

        setClaimDisabled(true);
        try {
            dispatch(setShowLoader(true));
            txId = await optInAsset(
                account,
                nfts[index]?.assetId,
                signer,
                stakingClient,
                connectedWallet
            );
            if (txId) {
                const res = await transferOptedInAsset(
                    nfts[index]?.assetId,
                    account
                );
                if (res) {
                    dispatch(updateClaimedNft(nfts[index]?.txId));
                    setClaimDisabled(false);
                } else setClaimDisabled(false);
            } else setClaimDisabled(false);
        } catch (error: any) {
            if (error.message?.includes("Operation cancelled")) {
                dispatch(setCancelledTrx(true));
            }
        }

        dispatch(setShowLoader(false));
    };

    const claimStyle: React.CSSProperties = {
        pointerEvents: claimBtnDisabled ? "none" : "auto",
        opacity: claimBtnDisabled ? "0.6" : "1",
    };

    return (
        <div className="nft-actions">
            <ClipboardCopy index={index} item={nfts[index]} />
            {/* <div
                style={optInStyle}
                // onClick={handleOptIn}
                className={`nft-actions-button${isOptIn ? "--disabled" : ""}`}
            >
                Opt-In
            </div> */}
            {nfts[index]?.isClaimed ? (
                <div
                    style={claimStyle}
                    onClick={handleClaim}
                    className={"nft-actions-button--disabled"}
                >
                    <span>
                        <img src={icon} alt="" />
                    </span>
                    <span>Claimed</span>
                </div>
            ) : (
                <div
                    style={claimStyle}
                    onClick={handleClaim}
                    className={"nft-actions-button"}
                >
                    Claim NFT
                </div>
            )}
        </div>
    );
}
